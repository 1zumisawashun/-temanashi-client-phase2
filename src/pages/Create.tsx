import { CreateTemplate } from '../components/template/Create'
import { useAuthContext } from '../hooks'
import {
  Sidebar,
  OnlineUsers,
  Header,
  Footer,
  Head
} from '../components/layout'
import { Loading } from '../components/ui'
import { Redirect } from 'react-router-dom'
import styled from '@emotion/styled'

const Container = styled('div')`
  flex-grow: 1;
  width: calc(100% - 650px);
`
const Inner = styled('div')`
  padding: 0 50px 50px;
`

export const Create: React.VFC = () => {
  const { user, authIsReady } = useAuthContext()

  if (!user && !authIsReady) {
    return <Loading />
  }

  if (!user && authIsReady) {
    return <Redirect to="/login" />
  }

  return (
    <>
      <Head title="Create.tsx" />
      <Sidebar />
      <Container>
        <Inner>
          <Header />
          <CreateTemplate />
        </Inner>
        <Footer />
      </Container>
      <OnlineUsers />
    </>
  )
}
