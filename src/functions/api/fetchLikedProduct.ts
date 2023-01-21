import { likedFurnitures, User } from '../../@types/dashboard'
import { subDocumentPoint } from '../utilities/converterClient'
import { firebase } from '../firebase/config'

export type CustomLikedFuriture = {
  documents: likedFurnitures
  referense: firebase.firestore.DocumentReference<likedFurnitures>
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
    documents: likedProductSnapshot.data()!
  }
}
