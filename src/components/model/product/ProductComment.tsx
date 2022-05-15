import { FC, useState, FormEvent } from "react";
import Avatar from "../../ui/Avatar";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { Comment } from "../../../@types/dashboard";
import { useParams } from "react-router-dom";
import { useSubCollection } from "../../../hooks/useSubCollection";
import { convertedPath } from "../../../utilities/utilities";
import PersonIcon from "../../../assets/icon/icon_person.svg";
import { ja } from "date-fns/locale";
import { timestamp } from "../../../firebase/config";
import { useAuthContext } from "../../../hooks/useAuthContext";
import { CommentToAdd } from "../../../@types/dashboard";
import BasicButton from "../../ui/BasicButton";
import { ProductItem } from "../../../utilities/stripeClient";
import { Modal } from "../../ui/BasicModal";
import { InputText } from "../../ui/InputText";

type Props = {
  furniture: ProductItem;
};

const ProductComments: FC<Props> = ({ furniture }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [newComment, setNewComment] = useState("");
  const { user } = useAuthContext();
  if (!user) throw new Error("we cant find your account");
  const { id }: { id: string } = useParams();

  const { referense } = useSubCollection<any, any>(
    convertedPath(`/products/${id}/comments`)
  );

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const commentToAdd: CommentToAdd = {
      displayName: user.displayName,
      photoURL: user.photoURL,
      content: newComment,
      createdAt: timestamp.fromDate(new Date()),
      id: Math.random(), // FIXME:被る可能性があるのでuuidに変更する
    };
    if (!referense) return;
    try {
      referense.add(commentToAdd);
      furniture.comments = [...furniture.comments, commentToAdd];
      setNewComment("");
    } catch (error) {
      if (error instanceof Error) {
        setNewComment("");
      }
    } finally {
      closeModal();
    }
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal = () => {
    setIsOpen(true);
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
        <Modal
          title="コメント入力フォーム"
          open={isOpen}
          handleOpen={closeModal}
          contents={
            <InputText
              onChange={(e) => setNewComment(e.target.value)}
              value={newComment}
            ></InputText>
          }
          footer={
            <div className="buttons">
              <BasicButton onClick={handleSubmit}>はい</BasicButton>
              <BasicButton onClick={closeModal}>いいえ</BasicButton>
            </div>
          }
        />
      </div>
    </>
  );
};

export default ProductComments;
