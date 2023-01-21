import { Timestamp, FieldValue } from '@firebase/firestore-types'
import { UserInfo } from '@firebase/auth-types'
import { ProductDoc, PriceDoc } from './Stripe'

// 最終的にプロダクトが持っている値の集合体
export type ProductItem = {
  product: ProductDoc
  prices: { [key: string]: PriceDoc }
  comments: Array<Comment>
}

// stripe.d.tsにも同じ型定義があるので統一させたい
export type Comment = {
  displayName: UserInfo['displayName']
  photoURL: UserInfo['photoURL']
  content: string
  createdAt: Timestamp
  id: number
}

export type likedFurnitures = {
  id?: string
  liked_furniture: ProductItem
  createdAt: Timestamp
}

export type Furniture = {
  width: number //幅
  depth: number //奥行き
  height: number //高さ
  price: number //税抜価格(関数処理で税込カンマ付きできる)
  baseColor: string //ベースカラー
  subColor: string //サブカラー
  stock: number //在庫
  likedCount: number //いいね総数(クライアントではfirebase.firestore.FieldValue)
  category: string //家具のカテゴリー
  name: string //名前
  imageUrl: string //画像のURL(配列の方が良い？)
  details: string //詳細情報
  createdAt: Timestamp //追加した日時
}
