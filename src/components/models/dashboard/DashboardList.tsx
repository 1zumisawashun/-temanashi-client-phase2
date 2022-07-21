import { Link } from 'react-router-dom'
import { css } from '@emotion/css'
import styled from '@emotion/styled'
import React from 'react'
import { ProductItem } from '../../../utilities/stripeClient'
import { formatTaxIncludedPrice } from '../../../utilities'
import { Image, Divider } from '../../uis'

export const DashboardListContainer = styled('div')`
  display: grid;
  grid-gap: 20px;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  margin-top: 30px;
`
export const DashboardListWrapper = styled(Link)`
  background-color: white;
  border-radius: 9px;
  box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.1);
  color: inherit;
  display: flex;
  justify-content: space-between;
  padding: 16px;
  text-decoration: none;
`
export const Thumbnail = styled('div')`
  display: flex;
  margin: auto;
  width: 70%;
`
/*
 * 小コンポーネントに送るために作成
 */
export const styledImage = css`
  border-radius: 6px;
  height: 160px;
  object-fit: cover;
  width: 220px;
`
export const Content = styled('div')`
  margin: auto;
  width: 30%;
`
export const Name = styled('p')`
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
export const Price = styled('span')`
  color: #444;
  font-size: 0.9rem;
`
export const DimentionContainer = styled('div')`
  display: block;
`
export const DimentionInner = styled('ul')`
  font-size: 14px;
  margin: 10px 0 0 0;
`
export const DimentionItem = styled('li')`
  margin-right: 10px;
`

type DashboardListProps = {
  productItems: Array<ProductItem>
}

export const DashboardList: React.VFC<DashboardListProps> = React.memo(
  ({ productItems }) => {
    return (
      <DashboardListContainer>
        {productItems &&
          productItems.map((item: ProductItem) => (
            <DashboardListWrapper
              to={`/products/${item.product.id}`}
              key={item.product.id}
            >
              <Thumbnail>
                {item.product.images.length > 0 ? (
                  <Image src={item.product.images[0]} className={styledImage} />
                ) : (
                  <Image
                    src="https://placehold.jp/230x160.png"
                    className={styledImage}
                  />
                )}
              </Thumbnail>
              <Content>
                <Name>{item.product.name}</Name>
                {Object.keys(item.prices).map((priceIndex) => (
                  <Price key={priceIndex}>
                    {formatTaxIncludedPrice(
                      item.prices[priceIndex].unit_amount
                    )}
                  </Price>
                ))}
                <Divider />
                <DimentionContainer>
                  <DimentionInner>
                    <DimentionItem>
                      横幅 {item.product.metadata?.width ?? 111}cm
                    </DimentionItem>
                    <DimentionItem>
                      深さ {item.product.metadata?.length ?? 222}cm
                    </DimentionItem>
                    <DimentionItem>
                      高さ {item.product.metadata?.height ?? 333}cm
                    </DimentionItem>
                  </DimentionInner>
                </DimentionContainer>
              </Content>
            </DashboardListWrapper>
          ))}
      </DashboardListContainer>
    )
  }
)
