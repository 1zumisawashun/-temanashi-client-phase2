import PaymentList from "./UserPaymentList";
import { NotFoundItem } from "../../ui";
interface UserHistoryProps {
  payments: Array<any>;
}

const UserHistory: React.VFC<UserHistoryProps> = ({ payments }) => {
  return (
    <div className="user-container">
      <div className="inner">
        {payments.length !== 0 ? (
          <PaymentList paymentItems={payments} />
        ) : (
          <NotFoundItem />
        )}
      </div>
    </div>
  );
};
export default UserHistory;
