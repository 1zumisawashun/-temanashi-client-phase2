import { Timestamp, FieldValue } from '@firebase/firestore-types'
import { UserInfo } from '@firebase/auth-types'
import { ProductDoc, PriceDoc } from './Stripe'

// NOTE:CreatedByなどAssignedUserで使うためidを付与
export type User = {
  displayName: UserInfo['displayName']
  id?: string
  online: boolean
  photoURL: UserInfo['photoURL']
}

export type likedUsers = {
  liked_user: {
    uid: UserInfo['uid']
    displayName: UserInfo['displayName']
  }
  createdAt: Timestamp
}
