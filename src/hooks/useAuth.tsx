import { useState, useEffect } from 'react'
import { projectAuth, projectStorage } from '../firebase/config'
import { documentPoint } from '../utilities/converterClient'
import { User } from '../@types/dashboard'
import { useToken, useAuthContext } from '.'

// FIXME:関係ないプロパティも追加・更新できてしまう
type addUser = Omit<User, 'id'>

export const useAuth = () => {
  const [isCancelled, setIsCancelled] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isPending, setIsPending] = useState(false)
  const { dispatch, user } = useAuthContext()
  const { createJWT, removeJWT } = useToken()

  const login = async (email: string, password: string) => {
    setError(null)
    setIsPending(true)

    try {
      const res = await projectAuth.signInWithEmailAndPassword(email, password)
      if (!res.user) return
      await documentPoint<addUser>('users', res.user.uid).update({
        online: true
      })
      createJWT({ uid: res.user.uid, name: res.user.displayName! })
      dispatch({ type: 'LOGIN', payload: res.user })
      if (!isCancelled) {
        setIsPending(false)
        setError(null)
      }
    } catch (err) {
      if (!isCancelled) {
        setError('エラーが発生しました。')
        setIsPending(false)
      }
    }
  }

  const signup = async (
    email: string,
    password: string,
    displayName: string,
    thumbnail: File
  ) => {
    setError(null)
    setIsPending(true)

    try {
      const res = await projectAuth.createUserWithEmailAndPassword(
        email,
        password
      )
      if (!res.user) return
      const uploadPath = `thumbnails/${res.user.uid}/${thumbnail.name}`
      const img = await projectStorage.ref(uploadPath).put(thumbnail)
      const imgUrl = await img.ref.getDownloadURL()

      await res.user.updateProfile({ displayName, photoURL: imgUrl })
      await documentPoint<addUser>('users', res.user.uid).set({
        online: true,
        displayName,
        photoURL: imgUrl
      })

      createJWT({ uid: res.user.uid, name: res.user.displayName! })
      dispatch({ type: 'LOGIN', payload: res.user })

      if (!isCancelled) {
        setIsPending(false)
        setError(null)
      }
    } catch (err) {
      if (!isCancelled) {
        setError('エラーが発生しました。')
        setIsPending(false)
      }
    }
  }

  const logout = async () => {
    setError(null)
    setIsPending(true)
    if (!user) return
    try {
      await documentPoint<addUser>('users', user.uid).update({
        online: false
      })

      await projectAuth.signOut()
      removeJWT()
      dispatch({ type: 'LOGOUT', payload: user })

      if (!isCancelled) {
        setIsPending(false)
        setError(null)
      }
    } catch (err) {
      if (!isCancelled) {
        setError('エラーが発生しました。')
        setIsPending(false)
      }
    }
  }

  useEffect(() => {
    return () => setIsCancelled(true)
  }, [])

  return { login, signup, logout, isPending, error }
}
