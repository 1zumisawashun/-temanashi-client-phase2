/* eslint-disable*/
import { loadStripe } from '@stripe/stripe-js'
import { CheckoutSessionDoc, CustomerDoc } from '../../@types/stripe'
import { subCollectionPoint } from './converterClient'

export type line_item = {
  price: string
  quantity: number
}

class ProductUseCase {
  /**
   * 更新①
   * NOTE:購入後にメールを送る実装が未着手
   * NOTE:stockの項目を作り0になったらsctive:falseにして購入不可にする
   */
  async buy(
    uid: string,
    line_items: Array<line_item>,
    success_url: string,
    cancel_url: string
  ) {
    return new Promise(async (resolve, reject) => {
      const CheckoutSessioRef = await subCollectionPoint<
        CustomerDoc,
        CheckoutSessionDoc
      >('customers', uid, 'checkout_sessions')

      const result = await CheckoutSessioRef.add({
        mode: 'payment',
        line_items, // 複数購入に対応
        success_url,
        cancel_url
      })

      result.onSnapshot(async (snap) => {
        const { error, sessionId } = (await snap.data()) as CheckoutSessionDoc
        if (error) return reject(error)
        if (sessionId) {
          const stripe = await loadStripe(
            process.env.REACT_APP_STRIPE_API_KEY || ''
          )
          if (!stripe) return reject()
          stripe.redirectToCheckout({ sessionId })
          return resolve(undefined)
        }
      })
    })
  }
}

export const productUseCase = new ProductUseCase()
