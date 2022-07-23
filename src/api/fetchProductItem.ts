import { ProductDoc, PriceDoc } from '../@types/stripe'
import { Comment, ProductItem } from '../@types/dashboard'
import { projectFirestore } from '../firebase/config'

/**
 * ドキュメント参照③
 * 特定の商品情報を取得する（Product+Price+Comment）
 */
export const fetchProductItem = async (id: string): Promise<ProductItem> => {
  const productItemRef = projectFirestore.collection('products').doc(id)
  const productItemSnapshot = await productItemRef.get()

  const priceRef = await productItemSnapshot.ref.collection('prices')
  const priceSnapshot = await priceRef.where('active', '==', true).get()
  const priceMap = await priceSnapshot.docs.reduce<Record<string, PriceDoc>>(
    (acc, v) => {
      acc[v.id] = v.data() as PriceDoc
      return acc
    },
    {}
  )

  const commentRef = await productItemSnapshot.ref.collection('comments')
  const commentSnapshot = await commentRef.get()

  const commentMap = await commentSnapshot.docs.map((snapshot) => {
    return snapshot.data()
  })
  const productItem: ProductItem = {
    product: {
      id: productItemSnapshot.id,
      ...productItemSnapshot.data()
    } as ProductDoc,
    prices: priceMap,
    comments: commentMap as Array<Comment>
  }
  return productItem
}
