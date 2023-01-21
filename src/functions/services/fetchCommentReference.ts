import { firebase } from '../libs/config'
import { ProductDoc } from '../../@types/stripe'
import { subCollectionPoint } from '../utilities/converterClient'
import { Comment } from '../../@types/dashboard'

/**
 * サブコレクション参照⑥
 * 商品に対するコメントの「参照」のみを取得する
 */
export const fetchCommentReference = async (
  productId: string
): Promise<firebase.firestore.CollectionReference<Comment>> => {
  const CommentsRef = subCollectionPoint<ProductDoc, Comment>(
    'products',
    productId,
    'comments'
  )
  return CommentsRef
}
