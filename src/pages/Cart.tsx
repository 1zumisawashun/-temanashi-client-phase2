import { Redirect } from 'react-router-dom'
import styled from '@emotion/styled'
import { CartTemplate } from '../components/template/Cart'
import { useAuthContext, mediaQuery } from '../hooks'
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
  min-height: calc(100vh - 100px);
  padding: 0 50px;
  ${mediaQuery('sp')} {
    padding: 0;
  }
`

export const Cart: React.VFC = () => {
  const { user, authIsReady } = useAuthContext()

  if (!user && !authIsReady) {
    return <Loading />
  }

  if (!user && authIsReady) {
    return <Redirect to="/login" />
  }

  return (
    <>
      <Head title="Cart.tsx" />
      <Sidebar />
      <Container>
        <Inner>
          <Header />
          <CartTemplate />
        </Inner>
        <Footer />
      </Container>
      <OnlineUsers />
    </>
  )
}
