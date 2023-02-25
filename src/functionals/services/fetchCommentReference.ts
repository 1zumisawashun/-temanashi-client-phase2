import { firebase } from '../libs/firebase'
import { ProductDoc } from '../types/Stripe'
import { subCollectionPoint } from '../utilities/converterClient'
import { Comment } from '../types/Product'

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
