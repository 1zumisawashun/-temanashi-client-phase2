import styled from '@emotion/styled'
import { useQuery } from 'react-query'
import { mediaQuery } from '../../functionals/hooks'
import { Avatar, Divider } from '../uis'
import { fetchAllUser } from '../../functionals/services/fetchAllUser'

const OnlineUserContainer = styled('div')`
  background: #fbfbfb;
  box-sizing: border-box;
  color: #444;
  min-width: 250px;
  padding: 30px;
  width: 250px;
  ${mediaQuery('sp')} {
    display: none;
  }
`
const Title = styled('h2')`
  font-size: 1.2em;
  margin-bottom: 40px;
  margin-right: 10px;
  text-align: right;
`
const OnlineUser = styled('span')`
  background: #0ebb50;
  border-radius: 50%;
  display: inline-block;
  height: 12px;
  margin-right: 10px;
  margin-top: 2px;
  width: 12px;
`
const OnlineUserItem = styled('div')`
  align-items: center;
  display: flex;
  justify-content: flex-end;
  margin: 20px auto;
`

export const OnlineUsers: React.VFC = () => {
  const { data } = useQuery('users', fetchAllUser)

  return (
    <OnlineUserContainer>
      <Title>All Users</Title>
      <Divider />
      {data &&
        data.map((user) => (
          <OnlineUserItem key={user.id}>
            {user.online && <OnlineUser />}
            <span>{user.displayName}</span>
            <Avatar src={user.photoURL || ''} />
          </OnlineUserItem>
        ))}
    </OnlineUserContainer>
  )
}
