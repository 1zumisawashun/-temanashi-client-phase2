import { useState, useCallback } from 'react'
import { useQuery } from 'react-query'
import { DashboardList } from '../models/dashboard'
import { useAuthContext } from '../../functions/hooks/useContextClient'
import { ProductItem } from '../../functions/types/Product'
import { fetchAllProduct } from '../../functions/services/fetchAllProduct'
import { dashboardFilterOptions } from '../../functions/constants/dashboardFilterOptions'
import { BasicFilter } from '../uis'

export const DashboardTemplate: React.VFC = () => {
  const { user } = useAuthContext()
  const [currentFilter, setCurrentFilter] = useState<string>('all')
  const { data } = useQuery('productItems', fetchAllProduct)

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
        <BasicFilter
          currentFilter={currentFilter}
          changeFilter={changeFilter}
          items={dashboardFilterOptions}
        />
      )}
      {filteredProductItems && (
        <DashboardList productItems={filteredProductItems} />
      )}
    </>
  )
}
