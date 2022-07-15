import styled from '@emotion/styled'
import NotFoundIcon from '../../assets/icon/icon_not_found.svg'

const NotFoundItemContainer = styled('div')`
  margin: 10% 0;
  text-align: center;
`
const Image = styled('img')`
  width: 35%;
`
const Message = styled('p')`
  color: #84bcb4;
  font-size: 1.5rem;
  font-weight: bold;
  margin: 30px 0;
`

export const ErrorNotFound: React.VFC = () => {
  return (
    <NotFoundItemContainer>
      <Image src={NotFoundIcon} alt="" />
      <Message>Not Found...</Message>
    </NotFoundItemContainer>
  )
}
