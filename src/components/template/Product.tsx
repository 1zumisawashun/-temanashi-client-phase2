import { useParams } from 'react-router-dom'
import styled from '@emotion/styled'
import { ProductComment, ProductSummary } from '../model/product'
import { productUseCase, ProductItem } from '../../utilities/stripeClient'
import { useData, useAuthContext } from '../../hooks'

const ProductContainer = styled('div')`
  align-items: start;
  display: grid;
  grid-gap: 60px;
  grid-template-columns: 3fr 2fr;
  @media (max-width: 576px) {
    display: block;
  }
`

export const ProductTemplate: React.VFC = () => {
  const { id } = useParams<{ id: string }>()
  const { user } = useAuthContext()

  if (!user) throw new Error('we cant find your account')

  const productItem = useData<ProductItem>(id, () =>
    productUseCase.fetchProductItem(id)
  )

  return (
    <ProductContainer>
      {productItem && (
        <>
          <ProductSummary furniture={productItem} productId={id} />
          <ProductComment furniture={productItem} productId={id} user={user} />
        </>
      )}
    </ProductContainer>
  )
}
