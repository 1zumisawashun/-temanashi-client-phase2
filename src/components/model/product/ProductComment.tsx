import { useState } from 'react'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import { useParams } from 'react-router-dom'
import { ja } from 'date-fns/locale'
import styled from '@emotion/styled'
import { Comment, CommentToAdd } from '../../../@types/dashboard'
import { useSubCollection, useDisclosure } from '../../../hooks'
import { formatFirebasePath } from '../../../utilities'
import { timestamp } from '../../../firebase/config'
import { useAuthContext } from '../../../hooks/useContextClient'
import {
  Button,
  Modal,
  InputTextarea,
  Avatar,
  ButtonIconPerson
} from '../../ui'
import { ProductItem } from '../../../utilities/stripeClient'

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
}

export const ProductComment: React.VFC<ProductCommentProps> = ({
  furniture
}) => {
  const commentModal = useDisclosure()
  const { id } = useParams<{ id: string }>()
  const { user } = useAuthContext()
  const { referense } = useSubCollection<any, any>(
    formatFirebasePath(`/products/${id}/comments`)
  )

  const [comments, setComments] = useState<Comment[]>(furniture.comments)
  const [newComment, setNewComment] = useState('')

  const handleSubmit = async () => {
    const commentToAdd: CommentToAdd = {
      displayName: user?.displayName,
      photoURL: user?.photoURL,
      content: newComment,
      createdAt: timestamp.fromDate(new Date()),
      id: Math.random()
    }
    try {
      referense?.add(commentToAdd)
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
