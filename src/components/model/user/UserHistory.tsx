import PaymentList from "./UserPaymentList";
import { ErrorNotFound } from "../../ui";
import styled from "@emotion/styled";

const UserContaienr = styled("div")`
  width: 100%;
  min-height: 300px;
  background: #f4f4f4;
`;
interface UserHistoryProps {
  payments: Array<any>;
}

const UserHistory: React.VFC<UserHistoryProps> = ({ payments }) => {
  return (
    <UserContaienr>
      {payments.length !== 0 ? (
        <PaymentList paymentItems={payments} />
      ) : (
        <ErrorNotFound />
      )}
    </UserContaienr>
  );
};
export default UserHistory;
