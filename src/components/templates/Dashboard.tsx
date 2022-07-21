import { useState, useCallback } from 'react'
import { useQuery } from 'react-query'
import { DashboardFilter, DashboardList } from '../models/dashboard'
import { useAuthContext } from '../../hooks/useContextClient'
import { productUseCase, ProductItem } from '../../utilities/stripeClient'

export const DashboardTemplate: React.VFC = () => {
  const { user } = useAuthContext()
  const [currentFilter, setCurrentFilter] = useState<string>('all')
  const { data } = useQuery('productItems', productUseCase.fetchAllProduct)

  // FIXME:一旦dashboardでパフォーマンスチューニングの検証を行う
  const changeFilter = useCallback((newFilter: string) => {
    setCurrentFilter(newFilter)
  }, [])

  if (!user) throw new Error('we cant find your account')

  const filteredProductItems = data
    ? data.filter((productItem: ProductItem) => {
        switch (currentFilter) {
          case 'all':
            return true
          case 'bed':
          case 'blanket':
          case 'chair':
          case 'lamp':
          case 'plant':
          case 'rug':
          case 'table':
          case 'shelf':
          case 'sofa':
          case 'development':
          case 'sales':
          case 'design':
          case 'marketing':
            return productItem.product.metadata?.category === currentFilter
          default:
            return true
        }
      })
    : null

  return (
    <>
      {filteredProductItems && (
        <DashboardFilter
          currentFilter={currentFilter}
          changeFilter={changeFilter}
        />
      )}
      {filteredProductItems && (
        <DashboardList productItems={filteredProductItems} />
      )}
    </>
  )
}
