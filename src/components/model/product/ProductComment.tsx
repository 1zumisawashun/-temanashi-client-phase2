import { useState, FormEvent } from "react";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { Comment, CommentToAdd } from "../../../@types/dashboard";
import { useParams } from "react-router-dom";
import { useSubCollection, useDisclosure } from "../../../hooks";
import { formatFirebasePath } from "../../../utilities";
import { ja } from "date-fns/locale";
import { timestamp } from "../../../firebase/config";
import { useAuthContext } from "../../../hooks/useContextClient";
import {
  Button,
  Modal,
  InputTextarea,
  Avatar,
  ButtonIconPerson,
} from "../../ui";
import { ProductItem } from "../../../utilities/stripeClient";

type ProductCommentProps = {
  furniture: ProductItem;
};

const ProductComment: React.VFC<ProductCommentProps> = ({ furniture }) => {
  const { user } = useAuthContext();
  const commentModal = useDisclosure();
  const { id } = useParams<{ id: string }>();

  const [newComment, setNewComment] = useState("");

  if (!user) throw new Error("we cant find your account");

  const { referense } = useSubCollection<any, any>(
    formatFirebasePath(`/products/${id}/comments`)
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
      /* eslint-disable no-param-reassign*/
      furniture.comments = [...furniture.comments, commentToAdd];
      setNewComment("");
    } catch (error) {
      if (error instanceof Error) {
        setNewComment("");
      }
    } finally {
      commentModal.close();
    }
  };

  return (
    <div className="product-comments">
      <ul className="comment-list">
        <li>
          <div className="auther">
            <ButtonIconPerson />
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
      <Button onClick={() => commentModal.open()}>コメント</Button>
      <Modal
        title="コメント入力フォーム"
        open={commentModal.isOpen}
        handleOpen={() => commentModal.close()}
        contents={
          <InputTextarea
            onChange={(e) => setNewComment(e.target.value)}
            value={newComment}
          />
        }
        footer={
          <>
            <Button onClick={handleSubmit}>コメントする</Button>
            <Button onClick={() => commentModal.close()}>閉じる</Button>
          </>
        }
      />
    </div>
  );
};

export default ProductComment;
