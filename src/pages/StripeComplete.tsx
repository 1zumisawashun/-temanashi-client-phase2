import styled from '@emotion/styled'
import { Head } from '../components/layout'
import { Button } from '../components/ui'

const CompleteContainer = styled('div')`
  background: #84bcb4;
`
const CompleteWrapper = styled('div')`
  align-items: center;
  color: white;
  display: flex;
  height: 100vh;
  justify-content: center;
  text-shadow: 0 30px 10px rgba(#000, 0.15);
  width: 100vw;
  &:before,
  &:after {
    background: linear-gradient(#84bcb4, lighten(#84bcb4, 3%));
    border-radius: 50%;
    content: '';
    left: 50%;
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
  }
  &:before {
    background: linear-gradient(lighten(#84bcb4, 3%), #84bcb4);
  }
`
const CompleteContent = styled('div')`
  text-align: center;
  z-index: 5;
`
const Message = styled('h1')`
  font-size: 95px;
  margin: 0;
`
const SubMessage = styled('p')`
  font-size: 18px;
  margin-bottom: 20px;
  margin-top: 0;
`
const Bubble = styled('div')`
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  box-shadow: 0 30px 15px rgba(#000, 0.15);
  position: absolute;

  &:before,
  &:after {
    background: rgba(255, 255, 255, 0.2);
    border-radius: 50%;
    box-shadow: 0 30px 15px rgba(#000, 0.15);
    content: '';
    position: absolute;
  }
  &:nth-child(1) {
    height: 22vmin;
    left: 15vw;
    top: 15vh;
    width: 22vmin;

    &:before {
      bottom: -25vh;
      height: 13vmin;
      right: -10vmin;
      width: 13vmin;
    }
  }
  &:nth-child(2) {
    height: 10vmin;
    left: 38vw;
    top: 20vh;
    width: 10vmin;
    &:before {
      bottom: -10vh;
      height: 5vmin;
      left: -8vmin;
      width: 5vmin;
    }
  }
  &:nth-child(3) {
    height: 13vmin;
    right: 30vw;
    top: 12vh;
    width: 13vmin;
    &:before {
      bottom: -15vh;
      height: 3vmin;
      left: -18vmin;
      width: 3vmin;
      z-index: 6;
    }
  }
  &:nth-child(4) {
    height: 18vmin;
    right: 18vw;
    top: 25vh;
    width: 18vmin;
    &:before {
      bottom: -10vmin;
      height: 7vmin;
      left: -15vmin;
      width: 7vmin;
    }
  }
  &:nth-child(5) {
    height: 28vmin;
    right: 18vw;
    top: 60vh;
    width: 28vmin;
    &:before {
      bottom: 5vmin;
      height: 10vmin;
      left: -25vmin;
      width: 10vmin;
    }
  }
  &:nth-child(6) {
    height: 25vmin;
    left: 28vw;
    top: 65vh;
    width: 25vmin;
    &:before {
      bottom: 15vmin;
      height: 10vmin;
      left: -25vmin;
      width: 10vmin;
    }
  }
`

export const Complete: React.VFC = () => {
  const moveToTop = () => {
    window.location.href = '/'
  }
  return (
    <>
      <Head title="StripeComplete.tsx" />
      <CompleteContainer>
        <CompleteWrapper>
          <CompleteContent>
            <Bubble />
            <Bubble />
            <Bubble />
            <Bubble />
            <Bubble />
            <Bubble />
            <Message>200</Message>
            <SubMessage>It looks like you are seccess !</SubMessage>
            <Button onClick={moveToTop} size="large" variant="error">
              トップ画面に戻る
            </Button>
          </CompleteContent>
        </CompleteWrapper>
      </CompleteContainer>
    </>
  )
}
