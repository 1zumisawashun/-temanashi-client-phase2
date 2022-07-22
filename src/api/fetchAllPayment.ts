import { PaymentDoc, CustomerDoc } from '../@types/stripe'
import { subCollectionPoint } from '../utilities/converterClient'

/**
 * サブコレクション参照④
 * 商品の購入履歴を全て取得する
 */
export const fetchAllPayment = async (
  uid: string
): Promise<Array<PaymentDoc>> => {
  const paymentsRef = subCollectionPoint<CustomerDoc, PaymentDoc>(
    'customers',
    uid,
    'payments'
  )
  const queryPaymentsRef = paymentsRef.where('status', '==', 'succeeded')
  const paymentsSnapshot = await queryPaymentsRef.get()
  const payments = await paymentsSnapshot.docs.map((doc) => {
    return doc.data()
  })
  return payments
}
