import { useEffect, useState } from 'react'
import { documentPoint } from '../utilities/converterClient'
import { firebasePath } from '../@types/dashboard'

type Id = {
  id: string
}

/**
 * suspenseでデータフェッチをする（useEffectでデータフェッチをしない）ため未使用_20220719
 */
export const useDocument = <T,>({ collection, document }: firebasePath) => {
  const [documents, setDocuments] = useState<T & Id>()
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const ref = documentPoint<T>(collection, document)
    const unsubscribe = ref.onSnapshot(
      (snapshot) => {
        if (snapshot) {
          setDocuments({
            ...(snapshot.data() as T),
            id: snapshot.id
          })
          setError(null)
        } else {
          setError('データの取得に失敗しました。')
        }
      },
      (error) => {
        setError('データの取得に失敗しました。')
      }
    )
    return () => unsubscribe()
  }, [collection, document])

  return { documents, error }
}
