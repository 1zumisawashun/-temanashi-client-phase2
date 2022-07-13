import {
  useAuthContext,
  useCartContext,
  useFirestore,
  useDisclosure,
} from "../../../hooks";
import { useHistory, useParams } from "react-router-dom";
import { Button, ButtonLike, Modal } from "../../ui";
import { ProductItem } from "../../../utilities/stripeClient";
import { formatTaxIncludedPrice } from "../../../utilities";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import styled from "@emotion/styled";

const ProductSummaryContainer = styled("div")`
  background-color: white;
  padding: 30px;
  border-radius: 4px;
  box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.05);
`;
const ThumbnailWrapper = styled("div")``;
const Thumbnail = styled("img")`
  width: 100%;
`;
const Title = styled("h2")`
  margin-top: 10px;
  font-size: 1.2em;
  color: #444;
`;
const ContentWrapper = styled("div")``;
const ContentPrice = styled("div")`
  font-size: 1.2em;
  color: #999;
`;
const ContentDetail = styled("p")`
  margin: 20px 0;
  color: #999;
  line-height: 1.8em;
  font-size: 0.9em;
`;
const ContentButtonWrapper = styled("div")`
  display: flex;
  gap: 20px;
`;

interface ProductSummaryProps {
  furniture: ProductItem;
}
interface Product {
  id: string;
  title: string;
  price: number;
  priceIndex: string;
  quantity?: number;
  image: string;
}

export const ProductSummary: React.VFC<ProductSummaryProps> = ({
  furniture,
}) => {
  const history = useHistory();
  const { addProductToCart } = useCartContext();
  const { deleteDocument } = useFirestore();
  const { id } = useParams<{ id: string }>();
  const { user } = useAuthContext();
  const executeModal = useDisclosure();
  const previewModal = useDisclosure();

  if (!user) throw new Error("we cant find your account");

  const addCart = async (product: Product) => {
    addProductToCart(product);
  };

  const handleDelete = async () => {
    executeModal.close();
    if (furniture.product) await deleteDocument<ProductItem>("products", id);
    history.push("/");
  };

  return (
    <ProductSummaryContainer>
      <ThumbnailWrapper>
        {furniture.product.images.length > 0 ? (
          <Thumbnail
            src={furniture.product.images[0]}
            alt=""
            onClick={() => previewModal.open()}
            // 追加しないとlintエラーになる
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
                  image: furniture.product.images[0],
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
  );
};
