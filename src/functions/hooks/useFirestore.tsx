import { useReducer, useEffect, useState } from 'react'
import { timestamp } from '../libs/config'
import { documentPoint, collectionPoint } from '../utilities/converterClient'

const initialState = {
  document: null,
  isPending: false,
  error: null,
  success: null
}

/**
 * useReducerのテスト
 * reducerもhooksディレクトリとして切り出しているが正解かは不明
 * 今のところdeleteしか使っていない
 */
const firestoreReducer = (state: any, action: any) => {
  switch (action.type) {
    case 'IS_PENDING':
      return { isPending: true, document: null, success: false, error: null }
    case 'ADDED_DOCUMENT':
      return {
        isPending: false,
        document: action.payload,
        success: true,
        error: null
      }
    case 'DELETED_DOCUMENT':
      return { isPending: false, document: null, success: true, error: null }
    case 'UPDATED_DOCUMENT':
      return {
        isPending: false,
        document: action.payload,
        success: true,
        error: null
      }
    case 'ERROR':
      return {
        isPending: false,
        document: null,
        success: false,
        error: action.payload
      }
    default:
      return state
  }
}

export const useFirestore = () => {
  const [response, dispatch] = useReducer(firestoreReducer, initialState)
  const [isCancelled, setIsCancelled] = useState(false)

  const dispatchIfNotCancelled = (action: any) => {
    if (!isCancelled) {
      dispatch(action)
    }
  }

  const addDocument = async <T,>(collection: string, doc: T) => {
    dispatch({ type: 'IS_PENDING' })
    try {
      const createdAt = timestamp.fromDate(new Date())
      const addedDocument = collectionPoint<T>(collection).add({
        ...doc,
        createdAt
      })
      dispatchIfNotCancelled({
        type: 'ADDED_DOCUMENT',
        payload: addedDocument
      })
    } catch (error) {
      dispatchIfNotCancelled({
        type: 'ERROR',
        payload: (error as Error).message
      })
    }
  }

  const deleteDocument = async <T,>(collection: string, id: string) => {
    dispatch({ type: 'IS_PENDING' })
    try {
      await documentPoint<T>(collection, id).delete()
      dispatchIfNotCancelled({ type: 'DELETED_DOCUMENT' })
    } catch (error) {
      dispatchIfNotCancelled({
        type: 'ERROR',
        payload: (error as Error).message
      })
    }
  }

  const updateDocument = async <T,>(
    collection: string,
    id: string,
    updates: T
  ) => {
    dispatch({ type: 'IS_PENDING' })
    try {
      const updatedDocument = await documentPoint<T>(collection, id).update(
        updates
      )
      dispatchIfNotCancelled({
        type: 'UPDATED_DOCUMENT',
        payload: updatedDocument
      })
      return updatedDocument
    } catch (error) {
      dispatchIfNotCancelled({
        type: 'ERROR',
        payload: (error as Error).message
      })
      return null
    }
  }

  useEffect(() => {
    return () => setIsCancelled(true)
  }, [])

  return { addDocument, deleteDocument, updateDocument, response }
}
