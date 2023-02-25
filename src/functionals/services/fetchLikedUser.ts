import { DocumentReference } from '@firebase/firestore-types'
import { likedUsers } from '../types/User'
import { ProductDoc } from '../types/Stripe'
import { subDocumentPoint } from '../utilities/converterClient'

export type CustomLikedUser = {
  documents?: likedUsers
  referense: DocumentReference<likedUsers>
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
  return { referense: LikedUserRef, documents: likedUserSnapshot.data() }
}
