import { useEffect, useState } from "react";
import { subCollectionPoint } from "../utilities/converterClient";
import { firebase } from "../firebase/config";
import { firebasePath } from "../@types/dashboard";

export const useSubCollection = <T, U>({
  collection,
  document,
  subCollection,
}: firebasePath) => {
  const [documents, setDocuments] = useState<Array<U>>([]);
  const [error, setError] = useState<string | null>(null);
  const [
    referense,
    setReferense,
  ] = useState<firebase.firestore.CollectionReference<U> | null>(null);

  useEffect(() => {
    const ref = subCollectionPoint<T, U>(collection, document, subCollection);
    if (ref !== undefined) {
      const unsubscribe = ref.onSnapshot(
        (snapshot) => {
          const results: Array<U> = [];
          snapshot.docs.forEach((doc) => {
            results.push({ ...doc.data(), id: doc.id });
          });
          setReferense(ref);
          setDocuments(results);
          setError(null);
        },
        (error) => {
          console.log(error);
          setError("could not fetch the data");
        }
      );
      return () => unsubscribe();
    }
  }, [collection, document, subCollection]);

  return { documents, error, referense };
};
