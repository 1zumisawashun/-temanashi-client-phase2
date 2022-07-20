import styled from '@emotion/styled'

const FooterContainer = styled('footer')`
  align-items: center;
  display: flex;
  height: 100px;
  justify-content: center;
`
const Copyright = styled('div')`
  color: gray;
  font-size: 14px;
`

export const Footer: React.VFC = () => {
  return (
    <FooterContainer>
      <Copyright>Copyright 2022 temanashi</Copyright>
    </FooterContainer>
  )
}
