import React, { useState, useRef, useMemo } from 'react'
import TinderCard from 'react-tinder-card'
import styled from '@emotion/styled'
import {
  Progressbar,
  ButtonIconThumbDown,
  ButtonIconThumbUp,
  ButtonIconUndo
} from '../../ui'
import { ProductItem } from '../../../utilities/stripeClient'
import { delay } from '../../../utilities'

const ButtonWrapper = styled('div')`
  display: flex;
  gap: 30px;
  justify-content: center;
  padding-top: 30px;
`
const CommonWrapper = styled('div')`
  width: 100%;
`
const TinderSwipeContainer = styled('div')`
  margin: 50px 0 0 0;
  text-align: center;
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

type TinderSwipeProps = {
  db: Array<ProductItem>
  changePendingDiagnose: () => void
}

export const DiagnoseTinderSwipe: React.VFC<TinderSwipeProps> = ({
  db,
  changePendingDiagnose
}) => {
  // eslint-disable-next-line
  const [lastDirection, setLastDirection] = useState<string>()
  const [currentIndex, setCurrentIndex] = useState<number>(db.length - 1)
  const [percent, setPercent] = useState<number>(0)

  /**
   * レンダリングされても状態を保つ（記録する）
   */
  const currentIndexRef = useRef(currentIndex)
  /**
   * dbのlengthだけuseRefを生成する
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
   * プログレスバーの進捗率を計算する
   */
  const progressBarCalclation = (val: number) => {
    const result = val + 1
    const result2 = result / db.length
    const result3 = 1 - result2
    setPercent(result3)
  }
  /**
   * useRefを更新する（valは基本1 or -1になる）
   */
  const updateCurrentIndex = async (val: number) => {
    setCurrentIndex(val)
    currentIndexRef.current = val
    progressBarCalclation(val)
    if (currentIndexRef.current === -1) {
      await delay(300) // progressbarのアニメーションを待つ
      changePendingDiagnose()
    }
  }
  /**
   * goback可能かを監視する
   * DBが5の場合4の時はgobackできない（初期gobackを不可にする）
   */
  const canGoBack = currentIndex < db.length - 1
  /**
   * スワイプ可能かを監視する
   * DBが5の場合4,3,2,1,0と減っていく
   */
  const canSwipe = currentIndex >= 0

  const outOfFrame = (idx: number) => {
    currentIndexRef.current >= idx && childRefs[idx].current.restoreCard()
  }
  /**
   * 手動でのスワイプの処理（押下式のスワイプも最終的にはこの関数を叩いている）
   * currentIndexを-1する
   */
  const swiped = (direction: string, index: number) => {
    setLastDirection(direction)
    updateCurrentIndex(index - 1)
  }
  /**
   * ライブラリのonSwipeメソッドを叩く>ローカルのswipeメソッドを叩く
   */
  const swipe = async (direction: string) => {
    if (canSwipe && currentIndex < db.length) {
      await childRefs[currentIndex].current.swipe(direction)
      // NOTE:swipeの処理が終わる前に別のページに遷移するとバグる
      // NOTE:cartでのみ発生して他のページはレンダリングするからなかったことになるっぽい
      console.log('swipeが完了しました')
    }
  }
  /**
   * gobackする
   * currentIndexを+1する
   */
  const goBack = async () => {
    if (!canGoBack) return
    const newIndex = currentIndex + 1
    updateCurrentIndex(newIndex)
    await childRefs[newIndex].current.restoreCard()
  }

  return (
    <CommonWrapper>
      <TinderSwipeContainer>
        <Progressbar width={100} percent={percent} />
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
          <ButtonIconUndo size="large" onClick={() => goBack()} />
          <ButtonIconThumbUp size="large" onClick={() => swipe('right')} />
        </ButtonWrapper>
      </TinderSwipeContainer>
    </CommonWrapper>
  )
}
