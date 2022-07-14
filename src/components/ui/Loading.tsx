import Loader from "react-loader-spinner";
import styled from "@emotion/styled";
import * as React from "react";

const LoadingContainer = styled("div")`
  align-items: center;
  bottom: 0;
  display: flex;
  justify-content: center;
  left: 0;
  position: fixed;
  right: 0;
  top: 0;
  z-index: 1300;
`;

const Backdrop = styled("div")`
  background-color: rgba(0, 0, 0, 0.5);
  bottom: 0;
  left: 0;
  position: fixed;
  right: 0;
  -webkit-tap-highlight-color: transparent;
  top: 0;
  z-index: -1;
`;

const Inner = styled("div")`
  left: 50%;
  position: absolute;
  text-align: center;
  top: 50%;
  transform: translate(-50%, -50%);
`;

export interface LoadingProps {
  color?: string;
}

/**
 * 読み込み系のローディングはライブラリのローディング（バックドロップあり）を使う
 * 追加・更新・削除時のローディングはMUIのローティング（バックドロップなし）を使う
 */
export const Loading: React.VFC<LoadingProps> = ({ color = "#84bcb4" }) => {
  return (
    <LoadingContainer>
      <Backdrop>
        <Inner>
          <Loader type="RevolvingDot" color={color} height={100} width={100} />
        </Inner>
      </Backdrop>
    </LoadingContainer>
  );
};
