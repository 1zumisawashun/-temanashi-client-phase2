import { Oval } from 'react-loader-spinner'
import styled from '@emotion/styled'
import * as React from 'react'

const LoadingContainer = styled('div')`
  align-items: center;
  bottom: 0;
  display: flex;
  justify-content: center;
  left: 0;
  position: fixed;
  right: 0;
  top: 0;
  z-index: 1300;
`

const Backdrop = styled('div')`
  background-color: rgba(0, 0, 0, 0.5);
  bottom: 0;
  left: 0;
  position: fixed;
  right: 0;
  -webkit-tap-highlight-color: transparent;
  top: 0;
  z-index: -1;
`

const Inner = styled('div')`
  left: 50%;
  position: absolute;
  text-align: center;
  top: 50%;
  transform: translate(-50%, -50%);
`
// NOTE:ローカルで作成したローディングアニメーション
export const CircleDotSpiner = styled('div')`
  animation: rotate 2s infinite;
  background: transparent;
  border: 3px dotted #84bcb4;
  border-radius: 50%;
  height: 40px;
  width: 40px;
  @keyframes rotate {
    from {
      transform: rotateZ(0deg);
    }
    to {
      transform: rotateZ(360deg);
    }
  }
`

// NOTE:ローカルで作成したローディングアニメーション2
export const RevolvingDotSpiner = styled('div')`
  animation: loading ease 1.5s infinite;
  border: 1px solid #84bcb4;
  border-radius: 50%;
  height: 40px;
  margin: auto 0;
  position: relative;
  width: 40px;
  &::before {
    background-color: #84bcb4;
    border-radius: 50%;
    content: '';
    display: block;
    height: 10px;
    left: 50%;
    position: absolute;
    top: 0;
    transform: translate(-50%, -50%);
    width: 10px;
  }
  @keyframes loading {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`

export interface LoadingProps {
  color?: string
}

/**
 * 読み込み系のローディングはライブラリのローディング（バックドロップあり）を使う
 * 追加・更新・削除時のローディングはMUIのローティング（バックドロップなし）を使う
 * https://github.com/mhnpd/react-loader-spinner
 * https://mhnpd.github.io/react-loader-spinner/
 */
export const Loading: React.VFC<LoadingProps> = ({ color = '#84bcb4' }) => {
  return (
    <LoadingContainer>
      <Backdrop>
        <Inner>
          <Oval
            ariaLabel="loading-indicator"
            height={70}
            width={70}
            strokeWidth={3}
            color={color}
            secondaryColor="white"
          />
        </Inner>
      </Backdrop>
    </LoadingContainer>
  )
}
