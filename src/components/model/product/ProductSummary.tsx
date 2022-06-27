import {
  useAuthContext,
  useCartContext,
  useFirestore,
  useDisclosure,
} from "../../../hooks";
import { useHistory , useParams } from "react-router-dom";
import { BasicButton, LikeButton, BasicModal } from "../../ui";
import { ProductItem } from "../../../utilities/stripeClient";
import { formatTaxIncludedPrice } from "../../../utilities";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import styled from "@emotion/styled";
import { v4 as uuidv4 } from "uuid";

const ButtonWrapper = styled("div")`
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

const ProductSummary: React.VFC<ProductSummaryProps> = ({ furniture }) => {
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
    <div className="project-summary-container">
      <div className="thumbnail">
        {furniture.product.images.length > 0 ? (
          <img
            src={furniture.product.images[0]}
            alt=""
            onClick={() => previewModal.open()}
            // 追加しないとlintエラーになる
            aria-hidden="true"
          />
        ) : (
          <img src="https://placehold.jp/200x160.png" alt="" />
        )}
        <BasicModal
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
          footer={
            <BasicButton onClick={() => previewModal.close()}>
              閉じる
            </BasicButton>
          }
        />
      </div>

      <h2 className="title">{furniture.product.name}</h2>
      {Object.keys(furniture.prices).map((priceIndex) => (
        <div key={priceIndex} className="content">
          <div className="price">
            {formatTaxIncludedPrice(furniture.prices[priceIndex].unit_amount)}
          </div>
          <p className="details">{furniture.product.description}</p>
          <ButtonWrapper>
            <BasicButton onClick={() => executeModal.open()}>削除</BasicButton>
            <BasicModal
              title="本当に削除しますか？"
              open={executeModal.isOpen}
              handleOpen={() => executeModal.close()}
              footer={
                <>
                  <BasicButton onClick={handleDelete}>はい</BasicButton>
                  <BasicButton onClick={() => executeModal.close()}>
                    いいえ
                  </BasicButton>
                </>
              }
            />
            <BasicButton
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
            </BasicButton>
            <LikeButton furniture={furniture} />
          </ButtonWrapper>
        </div>
      ))}
    </div>
  );
};
export default ProductSummary;
