import { Link } from 'react-router-dom'
import { css } from '@emotion/css'
import styled from '@emotion/styled'
import { useCartContext, mediaQuery } from '../../../functions/hooks'
import { formatTaxIncludedPrice } from '../../../functions/helpers'
import { CartCounter } from './CartCounter'
import { Divider, Image, ButtonIconDelete } from '../../uis'

const CartListContainer = styled('div')`
  margin: 0 auto;
  width: 80%;
  ${mediaQuery('sp')} {
    width: 100%;
  }
`
const CartListWrapper = styled('div')`
  border-radius: 6px;
  display: flex;
  justify-content: space-between;
  padding: 16px;
`
const Thumbnail = styled(Link)`
  display: block;
  display: flex;
  margin: auto;
  width: 30%;
`
/*
 * 小コンポーネントに送るために作成
 */
const styledImage = css`
  border-radius: 10px;
  height: 80px;
  object-fit: cover;
  width: 130px;
`
const Content = styled('div')`
  display: flex;
  justify-content: space-between;
  width: 70%;
  ${mediaQuery('sp')} {
    width: auto;
  }
`
const Detail = styled('div')`
  margin: auto 0;
`
const ButtonWrapper = styled('div')`
  display: block;
`
const Name = styled('p')`
  -webkit-box-orient: vertical;
  color: #444;
  /*
   * 3点リーダー
   */
  display: -webkit-box;
  font-size: 1.1rem;
  font-weight: bold;
  -webkit-line-clamp: 1;
  overflow: hidden;
  text-decoration: none;
`
const Price = styled('span')`
  color: #444;
  font-size: 0.9rem;
  margin: 0 10px;
`
interface Product {
  id: string
  title: string
  price: number
  priceIndex: string
  quantity?: number
  image: string
}
interface CartListProps {
  productItems: Array<Product>
}

export const CartList: React.VFC<CartListProps> = ({ productItems }) => {
  const { removeProductFromCart } = useCartContext()

  const HandleRemove = (productId: string) => {
    removeProductFromCart(productId)
  }

  return (
    <CartListContainer>
      {productItems &&
        productItems.map((item: Product) => (
          <>
            <CartListWrapper>
              <Thumbnail
                to={`/products/${item.id}`}
                key={item.id}
                className="thumbnail"
              >
                {item.image ? (
                  <Image src={item.image} className={styledImage} />
                ) : (
                  <Image
                    src="https://placehold.jp/230x160.png"
                    className={styledImage}
                  />
                )}
              </Thumbnail>
              <Content>
                <Detail>
                  <Name>
                    {item.title}
                    <Price>{formatTaxIncludedPrice(item.price)}</Price>
                  </Name>
                  <ButtonWrapper>
                    {item.quantity && (
                      <CartCounter
                        quantity={item.quantity}
                        productId={item.id}
                      />
                    )}
                  </ButtonWrapper>
                </Detail>
                <ButtonWrapper>
                  <ButtonIconDelete
                    styleName="delete-icon"
                    size="large"
                    onClick={() => HandleRemove(item.id)}
                  />
                </ButtonWrapper>
              </Content>
            </CartListWrapper>
            <Divider />
          </>
        ))}
    </CartListContainer>
  )
}
