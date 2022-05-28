import React, { useState, useRef, useMemo } from "react";
import TinderCard from "react-tinder-card";
import {
  ProgressBar,
  Loading,
  ThumbDownButton,
  ThumbUpButton,
  UndoButton,
} from "../../ui";
import { delay } from "../../../utilities/utilities";
// import TinderCard from '../react-tinder-card/index'
import styled from "@emotion/styled";

const ButtonWrapper = styled("div")`
  display: flex;
  justify-content: center;
  gap: 30px;
  padding-top: 30px;
`;

interface Product {
  id: string;
  name: string;
  random: number;
  image: string;
}

type TinderSwipeProps = {
  db: Array<Product>;
  setIsPendingDiagnose: any;
};

const TinderSwipe: React.VFC<TinderSwipeProps> = ({
  db,
  setIsPendingDiagnose,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [lastDirection, setLastDirection] = useState<string>();
  const [currentIndex, setCurrentIndex] = useState<number>(db.length - 1);
  const [percent, setPercent] = useState<number>(0);
  /**
   * レンダリングされても状態を保つ（記録する）
   *
   */
  const currentIndexRef = useRef(currentIndex);
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
  );
  /**
   * プログレスバーの進捗率を計算する
   */
  const progressBarCalclation = (val: number) => {
    const result = val + 1;
    const result2 = result / db.length;
    const result3 = 1 - result2;
    setPercent(result3);
  };
  /**
   *　useRefを更新する（valは基本1 or -1になる）
   */
  const updateCurrentIndex = async (val: number) => {
    setCurrentIndex(val);
    currentIndexRef.current = val;
    progressBarCalclation(val);
    if (currentIndexRef.current === -1) {
      await delay(300); // progressbarのdelayを待つ
      setIsLoading(true);
      await delay(2000); // NOTE:意図的ナビゲーションを遅らせないとレンダリングについてこれずに固まる
      setIsLoading(false);
      setIsPendingDiagnose(true);
    }
  };
  /**
   * goback可能かを監視する
   * DBが5の場合4の時はgobackできない（初期gobackを不可にする）
   */
  const canGoBack = currentIndex < db.length - 1;
  /**
   * スワイプ可能かを監視する
   * DBが5の場合4,3,2,1,0と減っていく
   */
  const canSwipe = currentIndex >= 0;

  const outOfFrame = (idx: number) => {
    currentIndexRef.current >= idx && childRefs[idx].current.restoreCard();
  };
  /**
   * 手動でのスワイプの処理（押下式のスワイプも最終的にはこの関数を叩いている）
   * currentIndexを-1する
   */
  const swiped = (direction: string, index: number) => {
    setLastDirection(direction);
    updateCurrentIndex(index - 1);
    console.log(lastDirection);
  };
  /**
   *　ライブラリのonSwipeメソッドを叩く>ローカルのswipeメソッドを叩く
   */
  const swipe = async (direction: string) => {
    if (canSwipe && currentIndex < db.length) {
      await childRefs[currentIndex].current.swipe(direction);
    }
  };
  /**
   * gobackする
   * currentIndexを+1する
   */
  const goBack = async () => {
    if (!canGoBack) return;
    const newIndex = currentIndex + 1;
    updateCurrentIndex(newIndex);
    await childRefs[newIndex].current.restoreCard();
  };

  return (
    <div className="common-container">
      {isLoading && <Loading message="loading" />}
      <div className="tinder-swipe">
        <ProgressBar width={100} percent={percent} />
        <div className="cardContainer">
          {db.map((character, index) => (
            <TinderCard
              ref={childRefs[index]}
              className="swipe"
              key={character.name}
              onSwipe={(dir) => swiped(dir, index)}
              onCardLeftScreen={() => outOfFrame(index)}
            >
              <div
                style={{ backgroundImage: "url(" + character.image + ")" }}
                className="card"
              >
                <h3>{character.name}</h3>
              </div>
            </TinderCard>
          ))}
        </div>
        <ButtonWrapper>
          <ThumbDownButton size="large" onClick={() => swipe("left")} />
          <UndoButton size="large" onClick={() => goBack()} />
          <ThumbUpButton size="large" onClick={() => swipe("right")} />
        </ButtonWrapper>
      </div>
    </div>
  );
};

export default TinderSwipe;
