import { useHistory } from 'react-router-dom'
import styled from '@emotion/styled'
import { useState } from 'react'
import { projectFunctions, isEmulating } from '../../../firebase/config'
import { useAuthContext, useToken, useAuth, useAxios } from '../../../hooks'
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

export const Bomb: React.VFC = () => {
  throw new Error('💥 CABOOM 💥')
}

export const UserAccount: React.VFC = () => {
  const { user } = useAuthContext()
  const { axios } = useAxios()
  const { logout, isPending } = useAuth()
  const { setJWT } = useToken()
  const history = useHistory()
  const [explode, setExplode] = useState(false)

  if (!user) throw new Error('we cant find your account')

  const handleSubmit = () => {
    logout()
    history.push('/login')
  }
  /**
   * エラーが発生している_20220719
   */
  const onCallTest = () => {
    const helloOnCall = projectFunctions.httpsCallable('helloOnCall')
    helloOnCall({ name: `shun` }).then((result) => {
      console.log(result.data, 'onCallTest')
    })
  }
  /**
   * useAxiosでhttp通信成功している_20220719
   * jwt必要なし
   */
  const onRequestTest = async () => {
    const result = await axios.get(`/helloOnRequest`)
    console.log(result, 'onRequestTest')
  }
  /**
   * useAxiosでhttp通信成功している_20220719
   * jwt必要あり
   */
  const getAxiosTest = async () => {
    const result = await axios.get(`/api/hello`)
    console.log(result, 'getAxiosTest')
  }
  /**
   * useAxiosでhttp通信成功している_20220719
   * jwt必要なし
   */
  const createJWT = async () => {
    const params = {
      uid: user.uid,
      name: user.displayName
    }
    const result: Response = await axios.post(`/api/jwt`, params)
    setJWT(result.jwt)
    console.log(result, 'createJWT')
  }
  /**
   * useAxiosでhttp通信成功している_20220719
   * jwt必要あり
   */
  const verifyJWT = async () => {
    const result = await axios.get(`/api/jwt/check`)
    console.log(result, 'verifyJWT')
  }

  const Emulating = () => console.log('Emulating')

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
      <Button onClick={() => setExplode((e) => !e)}>bomb</Button>
      {explode ? <Bomb /> : null}
    </UserContainer>
  )
}
