import { PriceDoc, ProductDoc } from '../@types/stripe'
import { projectFirestore } from '../firebase/config'
import { ProductItem } from '../@types/dashboard'

/**
 * コレクション参照①
 * 全ての商品情報を取得する（Product+Price）
 */
export const fetchAllProduct = async (): Promise<ProductItem[]> => {
  const productQuery = projectFirestore
    .collection('products')
    .orderBy('metadata.createdAt', 'desc')

  const productSnapshot = await productQuery.get()
  return Promise.all(
    productSnapshot.docs.map(async (doc, index) => {
      const priceRef = doc.ref.collection('prices')
      const priceSnapshot = await priceRef.where('active', '==', true).get()
      const priceMap = priceSnapshot.docs.reduce<Record<string, PriceDoc>>(
        (acc, v) => {
          acc[v.id] = v.data() as PriceDoc
          return acc
        },
        {}
      )
      const productItem: ProductItem = {
        product: {
          id: doc.id,
          random: index,
          ...doc.data()
        } as ProductDoc,
        prices: priceMap,
        comments: [] // NOTE:型定義を崩したくないため空の配列を入れる
      }

      return productItem
    })
  )
}
