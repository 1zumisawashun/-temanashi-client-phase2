import { useHistory } from 'react-router-dom'
import { Carousel } from 'react-responsive-carousel'
import styled from '@emotion/styled'
import { useCartContext, useFirestore, useDisclosure } from '../../../hooks'
import { Button, ButtonLike, Modal } from '../../ui'
import { ProductItem } from '../../../utilities/stripeClient'
import { formatTaxIncludedPrice } from '../../../utilities'
import 'react-responsive-carousel/lib/styles/carousel.min.css'

const ProductSummaryContainer = styled('div')`
  background-color: white;
  border-radius: 9px;
  box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.1);
  padding: 30px;
`
const ThumbnailWrapper = styled('div')`
  display: block;
`
const Thumbnail = styled('img')`
  border-radius: 6px;
  width: 100%;
`
const Title = styled('h2')`
  color: #444;
  font-size: 1.2em;
  margin-top: 10px;
`
const ContentWrapper = styled('div')`
  display: block;
`
const ContentPrice = styled('div')`
  color: #999;
  font-size: 1.2em;
`
const ContentDetail = styled('p')`
  color: #999;
  font-size: 0.9em;
  line-height: 1.8em;
  margin: 20px 0;
`
const ContentButtonWrapper = styled('div')`
  display: flex;
  gap: 20px;
`

interface ProductSummaryProps {
  furniture: ProductItem
  productId: string
}
interface Product {
  id: string
  title: string
  price: number
  priceIndex: string
  quantity?: number
  image: string
}

export const ProductSummary: React.VFC<ProductSummaryProps> = ({
  furniture,
  productId
}) => {
  const history = useHistory()
  const { addProductToCart } = useCartContext()
  const { deleteDocument } = useFirestore()
  const executeModal = useDisclosure()
  const previewModal = useDisclosure()

  const addCart = async (product: Product) => {
    addProductToCart(product)
  }

  const handleDelete = async () => {
    executeModal.close()
    if (furniture.product)
      await deleteDocument<ProductItem>('products', productId)
    history.push('/')
  }

  return (
    <ProductSummaryContainer>
      <ThumbnailWrapper>
        {furniture.product.images.length > 0 ? (
          <Thumbnail
            src={furniture.product.images[0]}
            alt=""
            onClick={() => previewModal.open()}
            aria-hidden="true"
          />
        ) : (
          <img src="https://placehold.jp/200x160.png" alt="" />
        )}
        <Modal
          title="プレビュー画面"
          open={previewModal.isOpen}
          handleOpen={() => previewModal.close()}
          contents={
            <Carousel>
              {furniture.product.images.map((item) => (
                <div key={item}>
                  <img src={item} alt="" />
                </div>
              ))}
            </Carousel>
          }
          footer={<Button onClick={() => previewModal.close()}>閉じる</Button>}
        />
      </ThumbnailWrapper>

      <Title>{furniture.product.name}</Title>
      {Object.keys(furniture.prices).map((priceIndex) => (
        <ContentWrapper key={priceIndex}>
          <ContentPrice>
            {formatTaxIncludedPrice(furniture.prices[priceIndex].unit_amount)}
          </ContentPrice>
          <ContentDetail>{furniture.product.description}</ContentDetail>
          <ContentButtonWrapper>
            <Button onClick={() => executeModal.open()}>削除</Button>
            <Modal
              title="本当に削除しますか？"
              open={executeModal.isOpen}
              handleOpen={() => executeModal.close()}
              footer={
                <>
                  <Button onClick={handleDelete}>はい</Button>
                  <Button onClick={() => executeModal.close()}>いいえ</Button>
                </>
              }
            />
            <Button
              onClick={() =>
                addCart({
                  id: furniture.product.id,
                  title: furniture.product.name,
                  price: furniture.prices[priceIndex].unit_amount,
                  priceIndex,
                  image: furniture.product.images[0]
                })
              }
            >
              購入
            </Button>
            <ButtonLike furniture={furniture} />
          </ContentButtonWrapper>
        </ContentWrapper>
      ))}
    </ProductSummaryContainer>
  )
}
