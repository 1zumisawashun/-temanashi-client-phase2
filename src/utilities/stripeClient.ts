/* eslint-disable*/
import { loadStripe } from '@stripe/stripe-js'
import type {
  Comment,
  likedFurnitures,
  User,
  likedUsers
} from '../@types/dashboard'
import {
  CheckoutSessionDoc,
  PriceDoc,
  ProductDoc,
  PaymentDoc,
  CustomerDoc
} from '../@types/stripe'
import { projectFirestore, firebase } from '../firebase/config'
import {
  subCollectionPoint,
  subDocumentPoint,
  collectionPoint
} from './converterClient'

export type ProductItem = {
  product: ProductDoc
  prices: { [key: string]: PriceDoc }
  comments: Array<Comment>
}

export type line_item = {
  price: string
  quantity: number
}

export type CustomLikedUser = {
  documents: likedUsers
  referense: firebase.firestore.DocumentReference<likedUsers>
}

export type CustomLikedFuriture = {
  documents: likedFurnitures
  referense: firebase.firestore.DocumentReference<likedFurnitures>
}

class ProductUseCase {
  /**
   * コレクション参照①
   * 全ての商品情報を取得する（Product+Price）
   */
  async fetchAllProduct(): Promise<ProductItem[]> {
    const productQuery = projectFirestore
      .collection('products')
      .orderBy('metadata.createdAt', 'desc')

    const productSnapshot = await productQuery.get()
    return Promise.all(
      productSnapshot.docs.map(async (doc, index) => {
        const priceRef = doc.ref.collection('prices')
        const priceSnapshot = await priceRef.where('active', '==', true).get()
        const priceMap = priceSnapshot.docs.reduce((acc, v) => {
          // @ts-ignore
          acc[v.id] = v.data() as PriceDoc
          return acc
        }, {})
        const productItem: ProductItem = {
          product: {
            id: doc.id,
            random: index,
            ...doc.data()
          } as ProductDoc,
          prices: priceMap,
          comments: [] // NOTE:型定義を崩したくないため空の配列を入れる
        }

        return productItem
      })
    )
  }

  /**
   * コレクション参照②
   * 全てのユーザー情報を取得する（User）
   */
  async fetchAllUser(): Promise<User[]> {
    const usersRef = collectionPoint<User>('users')
    const usersSnapshot = await usersRef.get()
    const usersMap = await usersSnapshot.docs.map((snapshot) => {
      return {
        id: snapshot.id,
        ...(snapshot.data() as User)
      }
    })
    return usersMap
  }

  /**
   * ドキュメント参照③
   * 特定の商品情報を取得する（Product+Price+Comment）
   */
  async fetchProductItem(id: string): Promise<ProductItem> {
    const productItemRef = projectFirestore.collection('products').doc(id)
    const productItemSnapshot = await productItemRef.get()
    const priceRef = await productItemSnapshot.ref.collection('prices')
    const priceSnapshot = await priceRef.where('active', '==', true).get()
    const priceMap = await priceSnapshot.docs.reduce((acc, v) => {
      // @ts-ignore
      acc[v.id] = v.data() as PriceDoc
      return acc
    }, {})

    const commentRef = await productItemSnapshot.ref.collection('comments')
    const commentSnapshot = await commentRef.get()

    const commentMap = await commentSnapshot.docs.map((snapshot) => {
      return snapshot.data()
    })
    const productItem: ProductItem = {
      product: {
        id: productItemSnapshot.id,
        ...productItemSnapshot.data()
      } as ProductDoc,
      prices: priceMap,
      comments: commentMap as Array<Comment>
    }
    return productItem
  }

  /**
   * サブコレクション参照④
   * 商品の購入履歴を全て取得する
   */
  async fetchAllPayment(uid: string): Promise<Array<PaymentDoc>> {
    const paymentsRef = subCollectionPoint<CustomerDoc, PaymentDoc>(
      'customers',
      uid,
      'payments'
    )
    const queryPaymentsRef = paymentsRef.where('status', '==', 'succeeded')
    const paymentsSnapshot = await queryPaymentsRef.get()
    const payments = await paymentsSnapshot.docs.map((doc) => {
      return doc.data()
    })
    return payments
  }

  /**
   * サブコレクション参照⑤
   * いいねした商品を全て取得する
   */
  async fetchAllFavoriteProduct(uid: string): Promise<Array<ProductItem>> {
    const favoriteProductsRef = subCollectionPoint<User, likedFurnitures>(
      'users',
      uid,
      'liked_furnitures'
    )
    const favoriteProductsSnapshot = await favoriteProductsRef.get()
    const favoriteProducts = await favoriteProductsSnapshot.docs.map((doc) => {
      return doc.data().liked_furniture
    })
    return favoriteProducts
  }

  /**
   * サブコレクション参照⑥
   * 商品に対するコメントの「参照」のみを取得する
   */
  async fetchCommentsRef(
    productId: string
  ): Promise<firebase.firestore.CollectionReference<Comment>> {
    const CommentsRef = subCollectionPoint<ProductDoc, Comment>(
      'products',
      productId,
      'comments'
    )
    return CommentsRef
  }

  /**
   * サブドキュメント参照⑦
   * いいねしたユーザーを取得する
   */
  async fetchLikedUser(
    uid: string,
    productId: string
  ): Promise<CustomLikedUser> {
    const LikedUserRef = subDocumentPoint<ProductDoc, likedUsers>(
      'products',
      productId,
      'liked_users',
      uid
    )
    const likedUserSnapshot = await LikedUserRef.get()
    return { referense: LikedUserRef, documents: likedUserSnapshot.data()! }
  }

  /**
   * サブドキュメント参照⑧
   * いいねされた商品を取得する
   */
  async fetchLikedProduct(
    uid: string,
    productId: string
  ): Promise<CustomLikedFuriture> {
    const LikedProductRef = subDocumentPoint<User, likedFurnitures>(
      'users',
      uid,
      'liked_furnitures',
      productId
    )
    const likedProductSnapshot = await LikedProductRef.get()
    return {
      referense: LikedProductRef,
      documents: likedProductSnapshot.data()!
    }
  }

  /**
   * 更新①
   * NOTE:購入後にメールを送る実装が未着手
   * NOTE:stockの項目を作り0になったらsctive:falseにして購入不可にする
   */
  async buy(
    uid: string,
    line_items: Array<line_item>,
    success_url: string,
    cancel_url: string
  ) {
    return new Promise(async (resolve, reject) => {
      const docRef = await projectFirestore
        .collection('customers')
        .doc(uid)
        .collection('checkout_sessions')
        .add({
          mode: 'payment',
          line_items, // 複数購入に対応
          success_url,
          cancel_url
        })
      docRef.onSnapshot(async (snap) => {
        const { error, sessionId } = (await snap.data()) as CheckoutSessionDoc
        if (error) return reject(error)
        if (sessionId) {
          const stripe = await loadStripe(
            process.env.REACT_APP_STRIPE_API_KEY || ''
          )
          if (!stripe) return reject()
          stripe.redirectToCheckout({ sessionId })
          return resolve(undefined)
        }
      })
    })
  }
}

export const productUseCase = new ProductUseCase()
