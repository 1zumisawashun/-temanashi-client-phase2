import { PriceDoc, ProductDoc } from '../../@types/stripe'
import { projectFirestore } from '../firebase/config'
import { ProductItem } from '../../@types/dashboard'

/**
 * コレクション参照①
 * 全ての商品情報を取得する（Product+Price）
 */
export const fetchAllProduct = async (): Promise<ProductItem[]> => {
  const productQuery = projectFirestore
    .collection('products')
    .orderBy('metadata.createdAt', 'desc')

  const productSnapshot = await productQuery.get()

  const promises = productSnapshot.docs.map(async (doc, index) => {
    const priceRef = doc.ref.collection('prices')
    const priceSnapshot = await priceRef.where('active', '==', true).get()
    const priceMap = priceSnapshot.docs.reduce<PriceDoc>((acc, v) => {
      acc[v.id] = v.data()
      return acc
    }, {} as PriceDoc)

    const product = {
      id: doc.id,
      random: index,
      ...doc.data()
    } as ProductDoc

    return {
      product,
      prices: priceMap,
      comments: []
    }
  })

  return Promise.all(promises)
}
