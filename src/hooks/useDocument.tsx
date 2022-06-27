import { useEffect, useState } from "react";
import { documentPoint } from "../utilities/converterClient";
import { firebasePath } from "../@types/dashboard";

type Id = {
  id: string;
};

export const useDocument = <T,>({ collection, document }: firebasePath) => {
  const [documents, setDocuments] = useState<T & Id>();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const ref = documentPoint<T>(collection, document);
    if (ref !== undefined) {
      const unsubscribe = ref.onSnapshot(
        (snapshot) => {
          if (snapshot) {
            setDocuments({
              ...(snapshot.data() as T),
              id: snapshot.id,
            });
            setError(null);
          } else {
            setError("no such socument exist");
          }
        },
        (err) => {
          console.log(err);
          setError("failed to get document");
        }
      );
      return () => unsubscribe();
    }
  }, [collection, document]);

  return { documents, error };
};
