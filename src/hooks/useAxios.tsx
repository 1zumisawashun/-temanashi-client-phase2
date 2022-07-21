import Axios, { AxiosRequestConfig } from 'axios'
import { useCookies } from 'react-cookie'

/* eslint-disable no-param-reassign */
export const useAxios = () => {
  const [cookies] = useCookies(['jwt'])

  const useAuthRequestInterceptor = (config: AxiosRequestConfig) => {
    if (cookies.jwt) {
      // NOTE:config.headers!.authorization = `${cookies.jwt}` だとやはりエラーになる
      config.headers!.authorization = `Bearer ${cookies.jwt}`
    }
    config.headers!.Accept = 'application/json'
    return config
  }

  const axios = Axios.create({
    baseURL: process.env.REACT_APP_BASE_URL
  })

  axios.interceptors.request.use(useAuthRequestInterceptor)

  // NOTE:intercepterを使って返り値をカスタムすることができる
  axios.interceptors.response.use(
    (response) => {
      console.log(response, 'axios response')
      return response.data
    },
    (error) => {
      console.log(error, 'axios error')
      const message = error.response?.data?.message || error.message
      return Promise.reject(message)
    }
  )

  return { axios }
}
