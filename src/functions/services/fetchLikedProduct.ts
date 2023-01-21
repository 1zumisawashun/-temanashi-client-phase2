import { DocumentReference } from '@firebase/firestore-types'
import { User } from '../types/User'
import { likedFurnitures } from '../types/Product'
import { subDocumentPoint } from '../utilities/converterClient'

export type CustomLikedFuriture = {
  documents?: likedFurnitures
  referense: DocumentReference<likedFurnitures>
}

/**
 * サブドキュメント参照⑧
 * いいねされた商品を取得する
 */
export const fetchLikedProduct = async (
  uid: string,
  productId: string
): Promise<CustomLikedFuriture> => {
  const LikedProductRef = subDocumentPoint<User, likedFurnitures>(
    'users',
    uid,
    'liked_furnitures',
    productId
  )
  const likedProductSnapshot = await LikedProductRef.get()
  return {
    referense: LikedProductRef,
    documents: likedProductSnapshot.data()
  }
}
