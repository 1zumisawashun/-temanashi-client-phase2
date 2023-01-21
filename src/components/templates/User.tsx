import { useState } from 'react'
import { useQuery } from 'react-query'
import { UserFavorite, UserHistory, UserAccount } from '../models/user'
import { useAuthContext } from '../../functions/hooks'
import { fetchAllPayment } from '../../functions/services/fetchAllPayment'
import { fetchAllFavoriteProduct } from '../../functions/services/fetchAllFavoriteProduct'
import { userFilterOptions } from '../../functions/constants/userFilterOptions'
import { BasicFilter } from '../uis'

export const UserTemplate: React.VFC = () => {
  const { user } = useAuthContext()
  if (!user) throw new Error('we cant find your account')

  // https://react-query-v3.tanstack.com/guides/parallel-queries
  // パラレルクエリの場合は下記のように必要に応じてuseQueryを呼ぶが正解ぽい
  const favoriteProducts = useQuery(['favoriteProducts', user.uid], () =>
    fetchAllFavoriteProduct(user.uid)
  )
  const payments = useQuery(['payments', user.uid], () =>
    fetchAllPayment(user.uid)
  )

  const [currentFilter, setCurrentFilter] = useState<string>('favorite')

  const changeFilter = (newFilter: string) => {
    setCurrentFilter(newFilter)
  }

  return (
    <>
      <BasicFilter
        currentFilter={currentFilter}
        changeFilter={changeFilter}
        items={userFilterOptions}
      />
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
