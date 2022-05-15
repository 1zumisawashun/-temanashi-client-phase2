import { FC, useState } from "react";
import Avatar from "../../ui/Avatar";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { Comment } from "../../../@types/dashboard";
import FormModal from "../../ui/Modal/FormModal";
import BasicButton from "../../ui/BasicButton";
import { ProductItem } from "../../../utilities/stripeClient";
import { useParams } from "react-router-dom";
import { useSubCollection } from "../../../hooks/useSubCollection";
import { convertedPath } from "../../../utilities/utilities";
import PersonIcon from "../../../assets/icon/icon_person.svg";
import { ja } from "date-fns/locale";

type Props = {
  furniture: ProductItem;
};

const ProductComments: FC<Props> = ({ furniture }) => {
  const [toggleModal, setToggleModal] = useState<boolean>(false);
  const { id }: { id: string } = useParams();

  const { referense } = useSubCollection<any, any>(
    convertedPath(`/products/${id}/comments`)
  );

  const openModal = () => {
    setToggleModal(true);
    document.body.style.overflow = "hidden";
  };

  return (
    <>
      <div className="product-comments">
        <ul className="comment-list">
          <li>
            <div className="auther">
              <Avatar src={PersonIcon} />
              <p>temanashi-tester</p>
            </div>
            <div className="date">
              <p>約5分前</p>
            </div>
            <div className="content">
              <p>free comment area !</p>
            </div>
          </li>
          {furniture.comments?.length > 0 &&
            furniture.comments?.map((comment: Comment) => (
              <li key={comment.id}>
                <div className="auther">
                  <Avatar src={comment.photoURL} />
                  <p>{comment.displayName}</p>
                </div>
                <div className="date">
                  <p>
                    {formatDistanceToNow(comment.createdAt?.toDate(), {
                      addSuffix: true,
                      locale: ja,
                    })}
                  </p>
                </div>
                <div className="content">
                  <p>{comment.content}</p>
                </div>
              </li>
            ))}
        </ul>
        <BasicButton onClick={openModal}>Comment</BasicButton>
        {toggleModal && referense && (
          <FormModal
            referense={referense}
            item={furniture}
            setToggleModal={setToggleModal}
          />
        )}
      </div>
    </>
  );
};

export default ProductComments;
