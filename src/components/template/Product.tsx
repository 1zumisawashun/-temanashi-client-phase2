import { useParams } from 'react-router-dom'
import styled from '@emotion/styled'
import { useQuery } from 'react-query'
import { ProductComment, ProductSummary } from '../model/product'
import { productUseCase } from '../../utilities/stripeClient'
import { useAuthContext, mediaQuery } from '../../hooks'

const ProductContainer = styled('div')`
  align-items: start;
  display: grid;
  grid-gap: 60px;
  grid-template-columns: 3fr 2fr;
  ${mediaQuery('sp')} {
    display: block;
  }
`

export const ProductTemplate: React.VFC = () => {
  const { id } = useParams<{ id: string }>()
  const { user } = useAuthContext()
  const { data } = useQuery(['productItem', id], () =>
    productUseCase.fetchProductItem(id)
  )

  if (!user) throw new Error('we cant find your account')

  return (
    <ProductContainer>
      {data && (
        <>
          <ProductSummary furniture={data} productId={id} />
          <ProductComment furniture={data} productId={id} user={user} />
        </>
      )}
    </ProductContainer>
  )
}
