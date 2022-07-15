import { Redirect } from 'react-router-dom'
import styled from '@emotion/styled'
import { UserTemplate } from '../components/template/User'
import { useAuthContext } from '../hooks'
import {
  Sidebar,
  OnlineUsers,
  Header,
  Footer,
  Head
} from '../components/layout'
import { Loading } from '../components/ui'

const Container = styled('div')`
  flex-grow: 1;
  width: calc(100% - 650px);
`
const Inner = styled('div')`
  padding: 0 50px 50px;
`

export const User: React.VFC = () => {
  const { user, authIsReady } = useAuthContext()

  if (!user && !authIsReady) {
    return <Loading />
  }

  if (!user && authIsReady) {
    return <Redirect to="/login" />
  }

  return (
    <>
      <Head title="User.tsx" />
      <Sidebar />
      <Container>
        <Inner>
          <Header />
          <UserTemplate />
        </Inner>
        <Footer />
      </Container>
      <OnlineUsers />
    </>
  )
}
