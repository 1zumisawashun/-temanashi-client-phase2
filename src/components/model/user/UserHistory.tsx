import { FC, useEffect, useState } from "react";
import { useAuthContext } from "../../../hooks/useAuthContext";
import { productUseCase } from "../../../utilities/stripeClient";
import PaymentList from "./UserPaymentList";
import Loading from "../../ui/Loading";
import NotFound from "../../ui/NotFound";

const UserHistory: FC = () => {
  const [isPending, setIsPending] = useState<boolean>(false);
  const [payments, setPayments] = useState<any[]>([]);
  const { user } = useAuthContext();
  // nullチェック・通常のreturnだとエラーになる
  if (!user) throw new Error("we cant find your account");

  const fetchPayments = async () => {
    try {
      setIsPending(true);
      const results = await productUseCase.fetchPayments(user.uid);
      setPayments(results);
    } finally {
      setIsPending(false);
    }
  };

  useEffect(() => {
    fetchPayments();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      {isPending && <Loading />}
      <div className="user-container">
        <div className="inner">
          {payments.length !== 0 && <PaymentList paymentItems={payments} />}
          {payments.length === 0 && <NotFound />}
        </div>
      </div>
    </>
  );
};
export default UserHistory;