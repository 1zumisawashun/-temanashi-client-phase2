import styled from '@emotion/styled'
import { Link } from 'react-router-dom'
import { css } from '@emotion/css'
import Image from '../Image'

const CardContainer = styled(Link)`
  display: block;
  width: 50%;
`
const CardInner = styled('div')`
  display: flex;
  padding: 20px;
  width: 100%;
`

const styledImage = css`
  border-radius: 10px;
  height: 150px;
  width: 150px;
`
const ContentWrapper = styled('div')`
  padding: 20px;
`
const Label = styled('p')`
  background: orange;
  display: inline-block;
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

export const LinkCardFlexWithoutBackground: React.VFC = () => {
  return (
    <CardContainer to="#">
      <CardInner>
        <Image src="https://placehold.jp/200x200.png" className={styledImage} />
        <ContentWrapper>
          <Label>NEW</Label>
          <Text>
            これはテストこれはテストこれはテストこれはテストこれはテスト
          </Text>
        </ContentWrapper>
      </CardInner>
    </CardContainer>
  )
}
