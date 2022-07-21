import { Link } from 'react-router-dom'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import { ja } from 'date-fns/locale'
import styled from '@emotion/styled'
import { Divider } from '../../ui'
import type { PaymentDoc } from '../../../@types/stripe'

const PaymentContaienr = styled('div')`
  padding: 30px 15px;
`
const PaymentWrapper = styled('div')`
  display: block;
`
const PaymentInner = styled('div')`
  display: flex;
  justify-content: space-between;
  padding: 20px 0px;
`
const PaymentName = styled('p')`
  font-weight: bold;
`
const PaymentDate = styled('span')`
  display: inline-block;
  font-size: 10px;
  font-weight: normal;
  margin: 0 5px;
  vertical-align: middle;
`
const PaymentLink = styled(Link)`
  color: #84bcb4;
  cursor: pointer;
  display: block;
  font-size: 0.8rem;
  margin: auto 0;
  text-decoration: none;
`
interface PaymentListProp {
  paymentItems: Array<PaymentDoc>
}

/* eslint-disable react/no-array-index-key */
// FIXME:型定義の見直しをする,PaymentDocと異なる
export const UserPaymentList: React.VFC<PaymentListProp> = ({
  paymentItems
}) => {
  return (
    <PaymentContaienr>
      {paymentItems &&
        paymentItems.map((payment: any, index: number) => (
          <PaymentWrapper key={`payments-${index}`}>
            {payment.items.map((item: any, index: number) => (
              <PaymentInner key={`items-${index}`}>
                <PaymentName>
                  {item.description}
                  <PaymentDate>
                    (
                    {formatDistanceToNow(new Date(item.price.created), {
                      addSuffix: true,
                      locale: ja
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
  )
}
