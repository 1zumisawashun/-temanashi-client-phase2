import { useState } from 'react'
import loadImage from 'blueimp-load-image'
import { projectStorage } from '../firebase/config'
import { useAuthContext } from './useContextClient'

export const useStorage = () => {
  const [error, setError] = useState<string | null>(null)
  const [isPending, setIsPending] = useState(false)
  const { user } = useAuthContext()

  if (!user) throw new Error('Could not complete signup')

  /**
   * データを圧縮する画像を返す
   */
  const getStorageUrl = async (state: Array<File>) => {
    setError(null)
    setIsPending(true)

    if (!state) {
      setError('state is null!')
      throw new Error()
    }

    const promises = state.map(async (file): Promise<string> => {
      const data = await loadImage(file, {
        maxWidth: 500,
        canvas: true
      })
      return new Promise((resolve, reject) => {
        ;(data.image as HTMLCanvasElement).toBlob(
          async (blob) => {
            if (!blob) {
              setError('could not generate blob')
              throw new Error()
            }
            const uploadPath = `photos/${user.uid}/${file.name}`
            try {
              const img = await projectStorage.ref(uploadPath).put(blob)
              const imgUrl = (await img.ref.getDownloadURL()) as string
              resolve(imgUrl)
            } catch (error) {
              setError('could not generate storage url')
              reject()
            }
          },
          file.type,
          0.7
        )
      })
    })

    const newPhotos = await Promise.all(promises)
    setIsPending(false)
    return newPhotos
  }

  /**
   * base64のdataURLを返す関数
   */
  const getBase64 = async (state: Array<File>) => {
    setError(null)
    setIsPending(true)

    if (!state) {
      setError('state is null!')
      throw new Error()
    }

    const promises = state.map(
      async (file): Promise<string | ArrayBuffer | null> => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader()
          reader.onload = () => resolve(reader.result)
          reader.onerror = (error) => reject(error)
          reader.readAsDataURL(file)
        })
      }
    )

    const newPhotos = await Promise.all(promises)
    setIsPending(false)
    return newPhotos
  }

  return { getStorageUrl, getBase64, isPending, error }
}
