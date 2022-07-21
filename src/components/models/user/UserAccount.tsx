import { useHistory } from 'react-router-dom'
import styled from '@emotion/styled'
import { useState } from 'react'
import { projectFunctions, isEmulating } from '../../../firebase/config'
import { useAuthContext, useToken, useAuth, useAxios } from '../../../hooks'
import { Button } from '../../uis'

const UserContainer = styled('div')`
  background: #f4f4f4;
  min-height: 300px;
  width: 100%;
`

export const Bomb: React.VFC = () => {
  throw new Error('💥 CABOOM 💥')
}

export const UserAccount: React.VFC = () => {
  const { user } = useAuthContext()
  const { axios } = useAxios()
  const { logout, isPending } = useAuth()
  const { createJWT, verifyJWT } = useToken()
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
  const onRequestTest = () => axios.get(`/helloOnRequest`)

  /**
   * useAxiosでhttp通信成功している_20220719
   * jwt必要あり
   */
  const handleAxios = () => axios.get(`/api/hello`)

  /**
   * useAxiosでhttp通信成功している_20220719
   * jwt必要なし
   */
  const handleCreateJwt = () =>
    createJWT({ uid: user.uid, name: user.displayName! })

  /**
   * useAxiosでhttp通信成功している_20220719
   * jwt必要あり
   */
  const handleVerifyJwt = async () => verifyJWT()

  const Emulating = () => console.log('Emulating')

  return (
    <UserContainer>
      <Button onClick={onCallTest}>OnCallTest</Button>
      <Button onClick={onRequestTest}>OnRequestTest</Button>
      <Button onClick={handleAxios}>GetAxiosTest</Button>
      <Button onClick={handleCreateJwt}>CreateJWT</Button>
      <Button onClick={handleVerifyJwt}>verifyJWT</Button>
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
