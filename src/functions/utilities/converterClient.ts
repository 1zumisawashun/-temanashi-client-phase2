import { FirestoreDataConverter, DocumentData } from '@firebase/firestore-types'
import { projectFirestore } from '../libs/config'

const converter = <T>(): FirestoreDataConverter<T> => ({
  toFirestore: (data) => data as DocumentData,
  fromFirestore: (snap) => snap.data() as T
})

const collectionPoint = <T>(collection: string) =>
  projectFirestore.collection(collection).withConverter(converter<T>())

const documentPoint = <T>(collection: string, document: string) =>
  projectFirestore
    .collection(collection)
    .withConverter(converter<T>())
    .doc(document)

const subCollectionPoint = <T, U>(
  collection: string,
  document: string,
  subCollection: string
) =>
  projectFirestore
    .collection(collection)
    .withConverter(converter<T>())
    .doc(document)
    .collection(subCollection)
    .withConverter(converter<U>())

const subDocumentPoint = <T, U>(
  collection: string,
  document: string,
  subCollection: string,
  subDocument: string
) =>
  projectFirestore
    .collection(collection)
    .withConverter(converter<T>())
    .doc(document)
    .collection(subCollection)
    .withConverter(converter<U>())
    .doc(subDocument)

export { collectionPoint, documentPoint, subCollectionPoint, subDocumentPoint }
