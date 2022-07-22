import styled from '@emotion/styled'
import { Link } from 'react-router-dom'
import { css } from '@emotion/css'
import Image from '../Image'

const CardContainer = styled(Link)`
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  display: block;
  width: 30%;
`
const ImageWrapper = styled('div')`
  position: relative;
`
const Label = styled('div')`
  background-color: orange;
  left: 10px;
  position: absolute;
  top: 10px;
`
const Ribbon = styled('div')`
  background-color: orange;
  bottom: 15px;
  position: absolute;
  right: 5px;
`

const styledImage = css`
  border-radius: 10px 10px 0 0;
  height: 150px;
  object-fit: cover;
  width: 100%;
`
const ContentWrapper = styled('div')`
  margin-top: -10px;
  padding: 10px;
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

export const LinkCardNormal: React.VFC = () => {
  return (
    <CardContainer to="#">
      <ImageWrapper>
        <Image src="https://placehold.jp/200x200.png" className={styledImage} />
        <Label>NEW</Label>
        <Ribbon>button</Ribbon>
      </ImageWrapper>
      <ContentWrapper>
        <Text>
          これはテストこれはテストこれはテストこれはテストこれはテスト
        </Text>
      </ContentWrapper>
    </CardContainer>
  )
}
