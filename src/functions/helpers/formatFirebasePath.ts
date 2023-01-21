import { firebasePath } from '../types/Common'

export const formatFirebasePath = (path: string): firebasePath => {
  const result = path.split('/')
  return {
    collection: result[1] ?? '',
    document: result[2] ?? '',
    subCollection: result[3] ?? '',
    subDocument: result[4] ?? ''
  }
}
