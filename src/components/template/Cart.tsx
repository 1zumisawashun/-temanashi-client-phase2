import { useState } from 'react'
import { useErrorHandler } from 'react-error-boundary'
import { productUseCase } from '../../utilities/stripeClient'
import { useToken, useAuthContext, useCartContext } from '../../hooks'
import { CartList, CartAgreement } from '../model/cart'
import { ErrorNotFound } from '../ui'

export const CartTemplate: React.VFC = () => {
  const { verifyJWT } = useToken()
  const { cart } = useCartContext()
  const { user } = useAuthContext()
  const handleError = useErrorHandler()

  const [isPending, setIsPending] = useState<boolean>(false)
  if (!user) throw new Error('we cant find your account')

  const onClickBuy = async () => {
    setIsPending(true)

    const line_items = cart.map((item) => {
      return {
        price: item.priceIndex,
        quantity: item.quantity ?? 0
      }
    })

    /**
     * トークンの有効期限は「5分」なので注意
     * 正常に動いていることは確認済み_20220719
     * 購入画面へ繊維する時にトークンチェックがないので直接ハンドリングする必要がある
     * https://ja.reactjs.org/docs/error-boundaries.html
     * react-dom.development.jsでエラーが発生している模様
     */
    const token = await verifyJWT()
    if (!token) {
      setIsPending(false)
      handleError('onClickBuy Error')
      return
    }

    try {
      const { uid } = user
      const seccess_url = `${window.location.origin}/complete`
      const cancel_url = `${window.location.origin}/error`
      await productUseCase.buy(uid, line_items, seccess_url, cancel_url)
      setIsPending(false)
    } catch (error) {
      setIsPending(false)
      handleError('onClickBuy Error')
    }
  }

  return (
    <div>
      {cart.length !== 0 ? (
        <>
          <CartList productItems={cart} />
          <CartAgreement onClick={onClickBuy} isLoading={isPending} />
        </>
      ) : (
        <ErrorNotFound />
      )}
    </div>
  )
}
