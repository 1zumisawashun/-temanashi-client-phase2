import { useEffect, useState, useRef } from 'react'
import { firebase } from '../libs/config'
import { collectionPoint } from '../utilities/converterClient'
import { firebasePath } from '../../@types/dashboard'

/**
 * useEffectでデータフェッチをしない仕様にする為、現在は未使用
 * _queryが配列なので関数が呼ばれるたびに「違う配列」として認識されるため
 * useRef未使用の場合useEffectで無限ループが発生してしまう
 */
export const useCollection = <T,>(
  { collection }: firebasePath,
  _query?: [string, WhereFilterOp, any],
  _orderBy?: [string, OrderByDirection]
) => {
  const [documents, setDocuments] = useState<Array<T>>([])
  const [error, setError] = useState<string | null>(null)

  const query = useRef(_query).current
  const orderBy = useRef(_orderBy).current

  useEffect(() => {
    let ref = collectionPoint<T>(collection)
    if (query) {
      ref = ref.where(...query) as firebase.firestore.CollectionReference<T>
    }
    if (orderBy) {
      ref = ref.orderBy(...orderBy) as firebase.firestore.CollectionReference<T>
    }
    const unsubscribe = ref.onSnapshot(
      (snapshot) => {
        const results: Array<T> = snapshot.docs.map((doc) => {
          return { ...doc.data(), id: doc.id }
        })
        setDocuments(results)
        setError(null)
      },
      (error) => {
        setError('データの取得に失敗しました。')
      }
    )
    return () => unsubscribe()
  }, [collection, query, orderBy])

  return { documents, error }
}
