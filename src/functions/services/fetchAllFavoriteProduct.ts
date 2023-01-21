import { likedFurnitures, User, ProductItem } from '../../@types/dashboard'
import { subCollectionPoint } from '../utilities/converterClient'

/**
 * サブコレクション参照⑤
 * いいねした商品を全て取得する
 */
export const fetchAllFavoriteProduct = async (
  uid: string
): Promise<Array<ProductItem>> => {
  const favoriteProductsRef = subCollectionPoint<User, likedFurnitures>(
    'users',
    uid,
    'liked_furnitures'
  )
  const favoriteProductsSnapshot = await favoriteProductsRef.get()
  const favoriteProducts = await favoriteProductsSnapshot.docs.map((doc) => {
    return doc.data().liked_furniture
  })
  return favoriteProducts
}
