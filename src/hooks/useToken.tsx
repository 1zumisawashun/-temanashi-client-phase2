import { useCookies } from 'react-cookie'
import { useAxios } from './useAxios'

export type JwtResponse = {
  message: string
  jwt: string
}

export type JwtParams = {
  uid: string
  name: string
}

/**
 * useCookiesの責務をこのファイルに閉じ込める
 * useAxiosでのみcookie取得のため使用しているが基本はこのファイルでuseCookiesを使う
 */
export const useToken = () => {
  const [cookies, setCookie, removeCookie] = useCookies(['jwt'])
  const { axios } = useAxios()

  const removeJWT = () => {
    removeCookie('jwt', { path: '/' })
  }

  const setJWT = (jwt: string) => {
    setCookie('jwt', jwt, { path: '/' })
  }

  const createJWT = async (params: JwtParams): Promise<string | null> => {
    try {
      const result: JwtResponse = await axios.post(`/api/jwt`, params)
      setJWT(result.jwt)
      return result.message // NOTE:Promise.resolveを返す
    } catch (error) {
      return null // NOTE:Promise.rejectを返す
    }
  }

  const verifyJWT = async (): Promise<string | null> => {
    try {
      const result: JwtResponse = await axios.get(`/api/jwt/check`)
      return result.message
    } catch (error) {
      return null
    }
  }

  return { cookies, verifyJWT, createJWT, removeJWT, setJWT }
}
