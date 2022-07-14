import { Link } from "react-router-dom";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { ja } from "date-fns/locale";
import styled from "@emotion/styled";
import { Divider } from "../../ui";

const PaymentContaienr = styled("div")`
  padding: 30px 15px;
`;
const PaymentWrapper = styled("div")``;
const PaymentInner = styled("div")`
  padding: 20px 0px;
  display: flex;
  justify-content: space-between;
`;
const PaymentName = styled("p")`
  font-weight: bold;
`;
const PaymentDate = styled("span")`
  display: inline-block;
  font-size: 10px;
  font-weight: normal;
  vertical-align: middle;
  margin: 0 5px;
`;
const PaymentLink = styled(Link)`
  font-size: 0.8rem;
  margin: auto 0;
  display: block;
  color: #84bcb4;
  text-decoration: none;
  cursor: pointer;
`;
interface PaymentListProp {
  paymentItems: Array<any>;
}

export const UserPaymentList: React.VFC<PaymentListProp> = ({
  paymentItems,
}) => {
  return (
    <PaymentContaienr>
      {paymentItems &&
        paymentItems.map((payment: any) => (
          <PaymentWrapper key={payment.id}>
            {payment.items.map((item: any) => (
              <PaymentInner key={item.id}>
                <PaymentName>
                  {item.description}
                  <PaymentDate>
                    (
                    {formatDistanceToNow(new Date(item.price.created), {
                      addSuffix: true,
                      locale: ja,
                    })}
                    )
                  </PaymentDate>
                </PaymentName>

                <PaymentLink
                  to={`/products/${item.price.product}`}
                  className="link"
                >
                  詳細を見る
                </PaymentLink>
              </PaymentInner>
            ))}
            <Divider variant="fullWidth" />
          </PaymentWrapper>
        ))}
    </PaymentContaienr>
  );
};
