import { useState, useEffect } from "react";
import { DiagnoseResult, DiagnoseTinderSwipe } from "../model/disgnose";
import { Loading } from "../ui";
import { useRandomContext } from "../../hooks/useContextClient";
import { useData } from "../../hooks/useData";
import { productUseCase, StoreProductItem } from "../../utilities/stripeClient";
interface Product {
  id: string;
  name: string;
  random: number;
  image: string;
}

export const DiagnoseTemplate: React.VFC = () => {
  const { products, addProductWithRandom } = useRandomContext();
  const [isPendingDiagnose, setIsPendingDiagnose] = useState<boolean>(false);
  const [documents, setDocuments] = useState<Array<Product>>([]);

  if (products.length === 0) {
    const storeProductItems = useData<StoreProductItem[]>(
      "storeProductItems",
      () => productUseCase.fetchAllForStore()
    );
    addProductWithRandom(storeProductItems);
  }

  useEffect(() => {
    if (products.length <= 5) return;
    setIsPendingDiagnose(true);
    const randomDocument: Array<Product> = [];
    let indexs: Array<number> = [];
    while (randomDocument.length <= 5) {
      const queryIndex = Math.floor(Math.random() * products.length - 1);
      if (!indexs.includes(queryIndex)) {
        indexs = [...indexs, queryIndex];
        const results = products.find((item) => item.random === queryIndex);
        if (results) {
          randomDocument.push(results);
          if (randomDocument.length === 5) {
            setDocuments(randomDocument);
            setIsPendingDiagnose(false);
          }
        }
      }
    }
  }, [products]);

  return (
    <>
      {documents.length === 0 && <Loading />}
      {!isPendingDiagnose && documents.length > 0 && (
        <DiagnoseTinderSwipe
          db={documents}
          setIsPendingDiagnose={setIsPendingDiagnose}
        />
      )}
      {isPendingDiagnose && <DiagnoseResult />}
    </>
  );
};
