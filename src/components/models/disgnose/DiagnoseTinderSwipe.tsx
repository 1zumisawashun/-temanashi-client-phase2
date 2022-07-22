import React, { useState, useRef, useMemo } from 'react'
import TinderCard from 'react-tinder-card'
import styled from '@emotion/styled'
import {
  ButtonIconThumbDown,
  ButtonIconThumbUp,
  ButtonIconUndo,
  BasicProgressbar
} from '../../uis'
import { ProductItem } from '../../../@types/dashboard'
import { delay } from '../../../utilities'

const CommonWrapper = styled('div')`
  align-items: center;
  display: flex;
  justify-content: center;
  /* innerHeaderとfooterを足すと200になる */
  min-height: calc(100vh - 200px);
`
const TinderSwipeContainer = styled('div')`
  display: block;
`
const CardContainer = styled('div')`
  height: 400px;
  margin: 0 auto;
  max-width: 280px;
  width: 300px;
`
const CustomTinderCard = styled(TinderCard)`
  position: absolute;
`
const Card = styled('div')`
  background-color: white;
  background-position: center;
  background-size: cover;
  border-radius: 20px;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
  height: 400px;
  max-width: 280px;
  position: relative;
  width: 300px;
`
const Title = styled('h3')`
  bottom: 0;
  color: white;
  margin: 10px;
  position: absolute;
`
const ButtonWrapper = styled('div')`
  display: flex;
  gap: 30px;
  justify-content: center;
  padding-top: 10px;
`

type TinderSwipeProps = {
  db: Array<ProductItem>
  changeHandler: () => void
}

/**
 * 手動でスワイプ=swiped>outOfFrameの順番で関数が発火する
 * ボタンでスワイプ=swipe>swiped>outOfFrameの順番で関数が発火する
 * swipedがcurrentIndexを更新する責務を持っている
 */
export const DiagnoseTinderSwipe: React.VFC<TinderSwipeProps> = ({
  db,
  changeHandler
}) => {
  const [lastDirection, setLastDirection] = useState<string>()
  const [currentIndex, setCurrentIndex] = useState<number>(db.length - 1)
  const [percent, setPercent] = useState<number>(0)

  /**
   * stateの即時反映されない時のために用意している？
   */
  const currentIndexRef = useRef(currentIndex)
  /**
   * dbのlengthだけRefを生成する
   * TinderSwipeを通すことでswipeメソッドとrestoreCardメソッドを付与する(useImperativeHandle)
   */
  const childRefs = useMemo<any>(
    () =>
      Array(db.length)
        .fill(0)
        .map((i) => React.createRef()),
    [db.length]
  )
  /**
   * プログレスバーの進捗率を計算・表示する
   */
  const progressbarCalclation = (val: number) => {
    const result = 1 - (val + 1) / db.length
    setPercent(result)
  }
  /**
   * state(currentIndex)を更新し連動している
   * useRef(currentIndexRef)も更新する
   */
  const updateCurrentIndex = async (val: number) => {
    setCurrentIndex(val)
    currentIndexRef.current = val // NOTE:stateだと即時反映されないからRefを使っている？
    progressbarCalclation(val)
    if (currentIndexRef.current === -1) {
      await delay(300) // NOTE:progressbarのアニメーションを待つ
      changeHandler()
    }
  }
  /**
   * goback可能かを判定する
   * DBが5の場合3の時はgobackできない
   * 初手gobackを不可にするために設置している
   */
  const canGoBack = currentIndex < db.length - 1
  /**
   * スワイプ可能かを判定する
   * DBが5の場合3,2,1,0,-1と減っていく
   */
  const canSwipe = currentIndex >= 0
  /**
   * ボタンを押下してスワイプした時に発火する
   * currentIndexを+1する
   */
  const goBack = async () => {
    if (!canGoBack) return
    const newIndex = currentIndex + 1
    updateCurrentIndex(newIndex)
    await childRefs[newIndex].current.restoreCard()
  }
  /**
   * ボタンを押下してスワイプした時に発火する
   * ライブラリのonSwipeメソッドを叩く=ローカルのswipeメソッドを叩く
   * FIXME:swipeの処理が終わる前に別のページに遷移するとバグる
   */
  const swipe = async (direction: string) => {
    if (canSwipe && currentIndex < db.length) {
      await childRefs[currentIndex].current.swipe(direction)
    }
  }
  /**
   * 1,手動でのスワイプした時に発火する
   * 2,ボタンを押下してスワイプした時に発火する（条件2の時swipe関数も発火する）
   * currentIndexを-1減らす
   */
  const swiped = (direction: string, index: number) => {
    setLastDirection(direction)
    updateCurrentIndex(index - 1)
  }
  /**
   * 1,手動でのスワイプした時に発火する
   * 2,ボタンを押下してスワイプした時に発火する（条件2の時swipe関数も発火する）
   */
  const outOfFrame = (index: number) => {
    currentIndexRef.current >= index && childRefs[index].current.restoreCard()
  }

  return (
    <CommonWrapper>
      <TinderSwipeContainer>
        <BasicProgressbar width={100} percent={percent} />
        <CardContainer>
          {db.map((character, index) => (
            <CustomTinderCard
              ref={childRefs[index]}
              key={character.product.name}
              onSwipe={(dir) => swiped(dir, index)}
              onCardLeftScreen={() => outOfFrame(index)}
            >
              <Card
                style={{
                  backgroundImage: `url(${character.product.images[0]})`
                }}
              >
                <Title>{character.product.name}</Title>
              </Card>
            </CustomTinderCard>
          ))}
        </CardContainer>
        <ButtonWrapper>
          <ButtonIconThumbDown size="large" onClick={() => swipe('left')} />
          <ButtonIconUndo size="large" onClick={goBack} />
          <ButtonIconThumbUp size="large" onClick={() => swipe('right')} />
        </ButtonWrapper>
      </TinderSwipeContainer>
    </CommonWrapper>
  )
}
