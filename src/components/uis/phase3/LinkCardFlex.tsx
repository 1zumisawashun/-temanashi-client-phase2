import styled from '@emotion/styled'
import { Link } from 'react-router-dom'
import { css } from '@emotion/css'
import Image from '../Image'

const CardContainer = styled(Link)`
  background-color: white;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  display: block;
  position: relative;
  width: 50%;
  :before {
    background-color: black;
    content: '';
    display: inline-block;
    height: 80px;
    position: absolute;
    top: 50%;
    -webkit-transform: translateY(-50%);
    transform: translateY(-50%);
    width: 5px;
  }
`
const CardInner = styled('div')`
  display: flex;
  padding: 20px;
  width: 100%;
`

const styledImage = css`
  height: 150px;
  width: 150px;
`
const ContentWrapper = styled('div')`
  padding: 20px;
`
const Date = styled('p')`
  color: #999;
  font-size: 14px;
`
const Text = styled('p')`
  -webkit-box-orient: vertical;
  color: #444;
  /*
   * 3点リーダー
   */
  display: -webkit-box;
  font-size: 1.1rem;
  -webkit-line-clamp: 2;
  overflow: hidden;
  text-decoration: none;
`

export const LinkCardFlex: React.VFC = () => {
  return (
    <CardContainer to="#">
      <CardInner>
        <Image src="https://placehold.jp/200x200.png" className={styledImage} />
        <ContentWrapper>
          <Date>2022/07/04~2022/07/31</Date>
          <Text>
            これはテストこれはテストこれはテストこれはテストこれはテスト
          </Text>
        </ContentWrapper>
      </CardInner>
    </CardContainer>
  )
}
