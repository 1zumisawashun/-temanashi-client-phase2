import { useFirestore } from "../../../hooks/useFirestore";
import { useAuthContext } from "../../../hooks/useAuthContext";
import { useHistory } from "react-router-dom";
import { FC, useState } from "react";
import LikeButton from "../../ui/LikeButton";
import BasicButton from "../../ui/BasicButton";
import { ProductItem } from "../../../utilities/stripeClient";
import { useParams } from "react-router-dom";
import Loading from "../../ui/Loading";
import { taxIncludedPrice } from "../../../utilities/utilities";
import { useCookies } from "react-cookie";
import { Modal } from "../../ui/BasicModal";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

type Props = {
  furniture: ProductItem;
};

const ProductSummary: FC<Props> = ({ furniture }) => {
  const [isOpenExecute, setIsOpenExecute] = useState<boolean>(false);
  const [isOpenPreview, setIsOpenPreview] = useState<boolean>(false);
  const [isPending, setIsPending] = useState<boolean>(false);
  const [cookies, setCookie] = useCookies(["productId"]);

  const { deleteDocument } = useFirestore();
  const { id }: { id: string } = useParams();
  const { user } = useAuthContext();
  const history = useHistory();
  if (!user) throw new Error("we cant find your account");

  const addCart = async (productId: string) => {
    if (!productId) return;
    setIsPending(true);
    try {
      if (!cookies.productId) {
        const newArray = [productId];
        setCookie("productId", newArray, { path: "/" });
      } else {
        const newArray = [productId, ...cookies.productId];
        setCookie("productId", newArray);
      }
    } catch (error) {
      alert(error);
    } finally {
      setIsPending(false);
      history.push(`/cart`);
    }
  };

  const handleDelete = () => {
    setIsOpenExecute(false);
    if (furniture.product) deleteDocument<ProductItem>("products", id);
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
    <>
      {isPending && <Loading />}
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
          <Modal
            title="詳細画面"
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
              <div className="buttons">
                <BasicButton onClick={closeModal}>閉じる</BasicButton>
              </div>
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
            <div className="btnarea">
              <BasicButton onClick={openModalExecute}>削除</BasicButton>
              <Modal
                title="本当に削除しますか？"
                open={isOpenExecute}
                handleOpen={closeModal}
                footer={
                  <div className="buttons">
                    <BasicButton onClick={handleDelete}>はい</BasicButton>
                    <BasicButton onClick={closeModal}>いいえ</BasicButton>
                  </div>
                }
              />
              <BasicButton onClick={() => addCart(furniture.product.id)}>
                購入
              </BasicButton>
              <LikeButton furniture={furniture} />
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
export default ProductSummary;
