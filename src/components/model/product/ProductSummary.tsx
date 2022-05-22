import { useFirestore } from "../../../hooks/useFirestore";
import { useAuthContext } from "../../../hooks/useAuthContext";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import { BasicButton, LikeButton, BasicModal } from "../../ui";
import { ProductItem } from "../../../utilities/stripeClient";
import { useParams } from "react-router-dom";
import { taxIncludedPrice } from "../../../utilities/utilities";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useCartContext } from "../../../hooks/useCartContext";
import styled from "@emotion/styled";

const ButtonWrapper = styled("div")`
  display: flex;
  gap: 30px;
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

  const [isOpenExecute, setIsOpenExecute] = useState<boolean>(false);
  const [isOpenPreview, setIsOpenPreview] = useState<boolean>(false);

  if (!user) throw new Error("we cant find your account");

  const addCart = async (product: Product) => {
    addProductToCart(product);
  };

  const handleDelete = async () => {
    setIsOpenExecute(false);
    if (furniture.product) await deleteDocument<ProductItem>("products", id);
    history.push("/");
  };

  const openModalPreview = () => {
    setIsOpenPreview(true);
  };
  const openModalExecute = () => {
    setIsOpenExecute(true);
  };
  const closeModal = () => {
    setIsOpenPreview(false);
    setIsOpenExecute(false);
  };

  return (
    <div className="project-summary-container">
      <div className="thumbnail">
        {furniture.product.images.length > 0 ? (
          <img
            src={furniture.product.images[0]}
            alt=""
            onClick={openModalPreview}
          />
        ) : (
          <img src="https://placehold.jp/200x160.png" alt="" />
        )}
        <BasicModal
          title="プレビュー画面"
          open={isOpenPreview}
          handleOpen={closeModal}
          contents={
            <Carousel>
              {furniture.product.images.map((item) => (
                <div>
                  <img src={item} alt="" />
                </div>
              ))}
            </Carousel>
          }
          footer={
            <BasicButton size="large" onClick={closeModal}>
              閉じる
            </BasicButton>
          }
        />
      </div>

      <h2 className="title">{furniture.product.name}</h2>
      {Object.keys(furniture.prices).map((priceIndex) => (
        <div key={priceIndex} className="content">
          <div className="price">
            {taxIncludedPrice(furniture.prices[priceIndex].unit_amount)}
          </div>
          <p className="details">{furniture.product.description}</p>
          <ButtonWrapper>
            <BasicButton size="large" onClick={openModalExecute}>
              削除
            </BasicButton>
            <BasicModal
              title="本当に削除しますか？"
              open={isOpenExecute}
              handleOpen={closeModal}
              footer={
                <>
                  <BasicButton size="large" onClick={handleDelete}>
                    はい
                  </BasicButton>
                  <BasicButton size="large" onClick={closeModal}>
                    いいえ
                  </BasicButton>
                </>
              }
            />
            <BasicButton
              size="large"
              onClick={() =>
                addCart({
                  id: furniture.product.id,
                  title: furniture.product.name,
                  price: furniture.prices[priceIndex].unit_amount,
                  priceIndex: priceIndex,
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
