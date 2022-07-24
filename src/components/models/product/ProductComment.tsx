import { useState } from 'react'
import { useQuery } from 'react-query'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import { ja } from 'date-fns/locale'
import styled from '@emotion/styled'
import { Comment, ProductItem } from '../../../@types/dashboard'
import { useDisclosure } from '../../../hooks'
import { timestamp, firebase } from '../../../firebase/config'
import {
  Button,
  Modal,
  InputTextarea,
  Avatar,
  ButtonIconPerson
} from '../../uis'
import { fetchCommentReference } from '../../../api/fetchCommentReference'

const ProductCommentContainer = styled('div')`
  width: 100%;
`
const ProductCommentWrapper = styled('ul')`
  max-height: 590px;
  overflow: auto;
  padding-bottom: 5px;
`
const ProductCommentInner = styled('li')`
  background: white;
  border: 1px solid #f2f2f2;
  border-radius: 9px;
  box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.1);
  margin: 10px 0 0 0;
  padding: 15px;
`
const ProductCommentAuther = styled('div')`
  align-items: center;
  color: #444;
  display: flex;
`
const ProductCommentDate = styled('div')`
  color: #999;
  font-size: 0.9em;
  margin: 4px 0 10px;
`
const ProductCommentContent = styled('div')`
  color: #999;
  font-size: 0.9em;
`

type ProductCommentProps = {
  furniture: ProductItem
  productId: string
  user: firebase.User
}

export const ProductComment: React.VFC<ProductCommentProps> = ({
  furniture,
  productId,
  user
}) => {
  const commentModal = useDisclosure()
  const { data } = useQuery('commentRef', () =>
    fetchCommentReference(productId)
  )

  const [comments, setComments] = useState<Comment[]>(furniture.comments)
  const [newComment, setNewComment] = useState('')

  const handleSubmit = async () => {
    const commentToAdd: Comment = {
      displayName: user.displayName,
      photoURL: user.photoURL,
      content: newComment,
      createdAt: timestamp.fromDate(new Date()),
      id: Math.random()
    }
    try {
      data?.add(commentToAdd)
      const updateComments = [...comments, commentToAdd]
      setComments(updateComments)
      setNewComment('')
      commentModal.close()
    } catch (error) {
      setNewComment('')
      commentModal.close()
    }
  }

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
        {comments?.length > 0 &&
          comments?.map((comment: Comment) => (
            <ProductCommentInner key={comment.id}>
              <ProductCommentAuther>
                <Avatar src={comment.photoURL} size="small" />
                <p>{comment.displayName}</p>
              </ProductCommentAuther>
              <ProductCommentDate>
                <p>
                  {formatDistanceToNow(comment.createdAt?.toDate(), {
                    addSuffix: true,
                    locale: ja
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
  )
}
