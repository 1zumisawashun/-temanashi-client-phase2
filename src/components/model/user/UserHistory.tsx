import { UserPaymentList } from './UserPaymentList'
import { ErrorNotFound } from '../../ui'
import styled from '@emotion/styled'

const UserContaienr = styled('div')`
  background: #f4f4f4;
  min-height: 300px;
  width: 100%;
`
interface UserHistoryProps {
  payments: Array<any>
}

export const UserHistory: React.VFC<UserHistoryProps> = ({ payments }) => {
  return (
    <UserContaienr>
      {payments.length !== 0 ? (
        <UserPaymentList paymentItems={payments} />
      ) : (
        <ErrorNotFound />
      )}
    </UserContaienr>
  )
}
