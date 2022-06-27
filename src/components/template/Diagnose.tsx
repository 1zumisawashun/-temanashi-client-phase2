import { useState, useEffect } from "react";
import DiagnoseTinderSwipe from "../model/disgnose/DiagnoseTinderSwipe";
import { Loading } from "../ui";
import DiagnoseResult from "../model/disgnose/DiagnoseResult";
import { useRandomContext } from "../../hooks/useContextClient";
interface Product {
  id: string;
  name: string;
  random: number;
  image: string;
}

const Diagnose: React.VFC = () => {
  const { products } = useRandomContext();
  const [isPendingDiagnose, setIsPendingDiagnose] = useState<boolean>(false);
  const [documents, setDocuments] = useState<Array<Product>>([]);

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
          } else {
            console.log("1個目のエラー");
            // エラー
          }
        } else {
          console.log("2個目のエラー");
          // エラー
        }
      } else {
        console.log("3個目のエラー");
        // エラー
      }
    }
  }, [products]);

  return (
    <main className="root">
      {documents.length === 0 && <Loading />}
      {!isPendingDiagnose && documents.length > 0 && (
        <DiagnoseTinderSwipe
          db={documents}
          setIsPendingDiagnose={setIsPendingDiagnose}
        />
      )}
      {isPendingDiagnose && <DiagnoseResult />}
    </main>
  );
};
export default Diagnose;
