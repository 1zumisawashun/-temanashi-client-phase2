import { FormEvent } from 'react'
import { useHistory } from 'react-router-dom'
import styled from '@emotion/styled'
import { projectFunctions, isEmulating } from '../../../firebase/config'
import { useAuthContext, useToken, useAuth } from '../../../hooks'
import axios from '../../../utilities/axiosClient'
import { Button } from '../../ui'

const UserContainer = styled('div')`
  background: #f4f4f4;
  min-height: 300px;
  width: 100%;
`

type Response = {
  message: string
  jwt: string
}

export const UserAccount: React.VFC = () => {
  const { user } = useAuthContext()
  if (!user) throw new Error('we cant find your account')
  const { logout, isPending } = useAuth()
  const { setJWT } = useToken()
  const history = useHistory()

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    logout()
    history.push('/login')
  }

  const onCallTest = () => {
    const helloOnCall = projectFunctions.httpsCallable('helloOnCall')
    helloOnCall({ name: `shun` }).then((result) => {
      console.log(result.data)
    })
  }
  const onRequestTest = async () => {
    const result = await axios.get(`/helloOnRequest`)
    console.log(result, 'result')
  }
  const getAxiosTest = async () => {
    const result = await axios.get(`/api/hello`)
    console.log(result, 'result')
  }
  const createJWT = async () => {
    const params = {
      uid: user.uid,
      name: user.displayName
    }
    const result = await axios.post<Response>(`/api/jwt`, params)
    setJWT(result.data.jwt)
    console.log(result, 'result')
  }
  const verifyJWT = async () => {
    const path = `/api/jwt/check`
    const result = await axios.get(path).catch((err) => {
      return err.response
    })
    if (result.status !== 200) {
      history.push('/error')
    }
    console.log(result, 'check JWT')
  }
  const Emulating = async () => {
    const path = `/api/hello`
    const result = await axios.get(path).catch((err) => {
      return err.response
    })
    if (result.status !== 200) {
      history.push('/error')
    }
    console.log(result, 'check Emulator')
  }

  return (
    <UserContainer>
      <Button onClick={onCallTest}>OnCallTest</Button>
      <Button onClick={onRequestTest}>OnRequestTest</Button>
      <Button onClick={getAxiosTest}>GetAxiosTest</Button>
      <Button onClick={createJWT}>CreateJWT</Button>
      <Button onClick={verifyJWT}>verifyJWT</Button>
      <Button onClick={Emulating} isDisabled={isEmulating}>
        emulatingTest
      </Button>
      <Button onClick={handleSubmit} isDisabled={isPending}>
        Logout
      </Button>
    </UserContainer>
  )
}
