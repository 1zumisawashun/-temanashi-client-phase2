import styled from '@emotion/styled'
import { Redirect } from 'react-router-dom'
import { DashboardTemplate } from '../components/templates/Dashboard'
import { useAuthContext, mediaQuery } from '../functions/hooks'
import {
  Sidebar,
  OnlineUsers,
  Header,
  Footer,
  Head
} from '../components/layouts'
import { Loading } from '../components/uis'

const Container = styled('div')`
  flex-grow: 1;
  width: calc(100% - 650px);
`
const Inner = styled('div')`
  min-height: calc(100vh - 100px);
  padding: 0 50px;
  ${mediaQuery('sp')} {
    padding: 0;
  }
`

export const Dashboard: React.VFC = () => {
  const { user, authIsReady } = useAuthContext()

  if (!user && !authIsReady) {
    return <Loading />
  }

  if (!user && authIsReady) {
    return <Redirect to="/login" />
  }

  return (
    <>
      <Head title="Dashboard.tsx" />
      <Sidebar />
      <Container>
        <Inner>
          <Header />
          <DashboardTemplate />
        </Inner>
        <Footer />
      </Container>
      <OnlineUsers />
    </>
  )
}
