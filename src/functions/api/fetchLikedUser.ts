import { likedUsers } from '../../@types/dashboard'
import { ProductDoc } from '../../@types/stripe'
import { subDocumentPoint } from '../utilities/converterClient'
import { firebase } from '../firebase/config'

export type CustomLikedUser = {
  documents: likedUsers
  referense: firebase.firestore.DocumentReference<likedUsers>
}

/**
 * サブドキュメント参照⑦
 * いいねしたユーザーを取得する
 */
export const fetchLikedUser = async (
  uid: string,
  productId: string
): Promise<CustomLikedUser> => {
  const LikedUserRef = subDocumentPoint<ProductDoc, likedUsers>(
    'products',
    productId,
    'liked_users',
    uid
  )
  const likedUserSnapshot = await LikedUserRef.get()
  return { referense: LikedUserRef, documents: likedUserSnapshot.data()! }
}
