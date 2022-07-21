import { useState } from 'react'
import { useQuery } from 'react-query'
import { productUseCase } from '../../utilities/stripeClient'
import {
  UserFavorite,
  UserHistory,
  UserAccount,
  UserFilter
} from '../models/user'
import { useAuthContext } from '../../hooks'

export const UserTemplate: React.VFC = () => {
  const { user } = useAuthContext()
  if (!user) throw new Error('we cant find your account')

  // https://react-query-v3.tanstack.com/guides/parallel-queries
  // パラレルクエリの場合は下記のように必要に応じてuseQueryを呼ぶが正解ぽい
  const favoriteProducts = useQuery(['favoriteProducts', user.uid], () =>
    productUseCase.fetchAllFavoriteProduct(user.uid)
  )
  const payments = useQuery(['payments', user.uid], () =>
    productUseCase.fetchAllPayment(user.uid)
  )

  const [currentFilter, setCurrentFilter] = useState<string>('favorite')

  const changeFilter = (newFilter: string) => {
    setCurrentFilter(newFilter)
  }

  return (
    <>
      <UserFilter currentFilter={currentFilter} changeFilter={changeFilter} />
      {currentFilter === 'favorite' && favoriteProducts.data && (
        <UserFavorite productItems={favoriteProducts.data} />
      )}
      {currentFilter === 'history' && payments.data && (
        <UserHistory payments={payments.data} />
      )}
      {currentFilter === 'account' && <UserAccount />}
    </>
  )
}
