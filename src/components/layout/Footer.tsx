import styled from '@emotion/styled'
import { Divider } from '../ui'

const FooterContainer = styled('footer')`
  padding-bottom: 20px;
  text-align: center;
`
const Copyright = styled('div')`
  color: gray;
  display: inline-block;
  font-size: 14px;
  padding: 20px;
`

export const Footer: React.VFC = () => {
  return (
    <FooterContainer>
      <Divider />
      <Copyright>Copyright 2022 temanashi</Copyright>
    </FooterContainer>
  )
}
