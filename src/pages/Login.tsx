import { Redirect } from 'react-router-dom'
import styled from '@emotion/styled'
import { LoginTemplate } from '../components/templates/Login'
import { useAuthContext } from '../functions/hooks'
import { Head } from '../components/layouts'

const Container = styled('div')`
  flex-grow: 1;
  width: calc(100% - 650px);
`

export const Login: React.VFC = () => {
  const { user } = useAuthContext()

  return user ? (
    <Redirect to="/" />
  ) : (
    <>
      <Head title="Login.tsx" />
      <Container>
        <LoginTemplate />
      </Container>
    </>
  )
}
