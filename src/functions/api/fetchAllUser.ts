import { User } from '../../@types/dashboard'
import { collectionPoint } from '../utilities/converterClient'

/**
 * コレクション参照②
 * 全てのユーザー情報を取得する（User）
 */
export const fetchAllUser = async (): Promise<User[]> => {
  const usersRef = collectionPoint<User>('users')
  const usersSnapshot = await usersRef.get()
  const usersMap = await usersSnapshot.docs.map((snapshot) => {
    return {
      id: snapshot.id,
      ...(snapshot.data() as User)
    }
  })
  return usersMap
}
