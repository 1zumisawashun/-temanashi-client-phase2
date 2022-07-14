import { useCollection } from '../../hooks/useCollection'
import { Avatar, Divider } from '../ui'
import { User } from '../../@types/dashboard'
import { formatFirebasePath } from '../../utilities'
import styled from '@emotion/styled'

const OnlineUserContainer = styled('div')`
  width: 250px;
  min-width: 250px;
  padding: 30px;
  box-sizing: border-box;
  background: #fbfbfb;
  color: #444;
  @media (max-width: 576px) {
    display: none;
  }
`
const Title = styled('h2')`
  text-align: right;
  margin-bottom: 40px;
  font-size: 1.2em;
  margin-right: 10px;
`
const OnlineUser = styled('span')`
  display: inline-block;
  margin-right: 10px;
  width: 12px;
  height: 12px;
  background: #0ebb50;
  border-radius: 50%;
  margin-top: 2px;
`
const OnlineUserItem = styled('div')`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin: 20px auto;
`

export const OnlineUsers: React.VFC = () => {
  const { documents } = useCollection<User>(formatFirebasePath('/users'))

  return (
    <OnlineUserContainer>
      <Title>All Users</Title>
      <Divider />
      {documents &&
        documents.map((user) => (
          <OnlineUserItem key={user.id}>
            {user.online && <OnlineUser />}
            <span>{user.displayName}</span>
            <Avatar src={user.photoURL} />
          </OnlineUserItem>
        ))}
    </OnlineUserContainer>
  )
}
