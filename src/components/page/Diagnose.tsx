import { FC, useState } from "react";
import DiagnoseTinderSwipe from "../model/disgnose/DiagnoseTinderSwipe";
import { useRandomDocument } from "../../hooks/useRandomDocument";
import Loading from "../ui/Loading";
import DiagnoseResult from "../model/disgnose/DiagnoseResult";

const Diagnose: FC = () => {
  const { documents } = useRandomDocument();
  const [isPendingDiagnose, setIsPendingDiagnose] = useState<boolean>(false);

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
