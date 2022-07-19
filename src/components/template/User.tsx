import { useState } from 'react'
import { productUseCase, ProductItem } from '../../utilities/stripeClient'
import {
  UserFavorite,
  UserHistory,
  UserAccount,
  UserFilter
} from '../model/user'
import { useAuthContext, useData } from '../../hooks'
import type { PaymentDoc } from '../../@types/stripe'

export const UserTemplate: React.VFC = () => {
  const { user } = useAuthContext()
  if (!user) throw new Error('we cant find your account')

  const [currentFilter, setCurrentFilter] = useState<string>('favorite')

  const changeFilter = (newFilter: string) => {
    setCurrentFilter(newFilter)
  }

  const payments = useData<Array<PaymentDoc>>(user.displayName!, () =>
    productUseCase.fetchAllPayment(user.uid)
  )
  const favoriteProducts = useData<Array<ProductItem>>(user.uid, () =>
    productUseCase.fetchAllFavoriteProduct(user.uid)
  )

  return (
    <>
      <UserFilter currentFilter={currentFilter} changeFilter={changeFilter} />
      {currentFilter === 'favorite' && (
        <UserFavorite productItems={favoriteProducts} />
      )}
      {currentFilter === 'history' && <UserHistory payments={payments} />}
      {currentFilter === 'account' && <UserAccount />}
    </>
  )
}
