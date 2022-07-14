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
import styled from "@emotion/styled";

const ProductCommentContainer = styled("div")`
  width: 100%;
`;
const ProductCommentWrapper = styled("ul")`
  max-height: 590px;
  overflow: auto;
  padding-bottom: 5px;
`;
const ProductCommentInner = styled("li")`
  padding: 15px;
  margin: 10px 0 0 0;
  border: 1px solid #f2f2f2;
  box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.1);
  background: white;
  border-radius: 9px;
`;
const ProductCommentAuther = styled("div")`
  display: flex;
  align-items: center;
  color: #444;
`;
const ProductCommentDate = styled("div")`
  color: #999;
  font-size: 0.9em;
  margin: 4px 0 10px;
`;
const ProductCommentContent = styled("div")`
  color: #999;
  font-size: 0.9em;
`;

type ProductCommentProps = {
  furniture: ProductItem;
};

export const ProductComment: React.VFC<ProductCommentProps> = ({
  furniture,
}) => {
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
    <ProductCommentContainer>
      <ProductCommentWrapper>
        <ProductCommentInner>
          <ProductCommentAuther>
            <ButtonIconPerson />
            <p>temanashi-tester</p>
          </ProductCommentAuther>
          <ProductCommentDate>
            <p>約5分前</p>
          </ProductCommentDate>
          <ProductCommentContent>
            <p>free comment area !</p>
          </ProductCommentContent>
        </ProductCommentInner>
        {furniture.comments?.length > 0 &&
          furniture.comments?.map((comment: Comment) => (
            <ProductCommentInner key={comment.id}>
              <ProductCommentAuther>
                <Avatar src={comment.photoURL} size="small" />
                <p>{comment.displayName}</p>
              </ProductCommentAuther>
              <ProductCommentDate>
                <p>
                  {formatDistanceToNow(comment.createdAt?.toDate(), {
                    addSuffix: true,
                    locale: ja,
                  })}
                </p>
              </ProductCommentDate>
              <ProductCommentContent>
                <p>{comment.content}</p>
              </ProductCommentContent>
            </ProductCommentInner>
          ))}
      </ProductCommentWrapper>
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
    </ProductCommentContainer>
  );
};
