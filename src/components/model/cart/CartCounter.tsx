import styled from '@emotion/styled'
import { useCartContext } from '../../../hooks/useContextClient'
import { ButtonIconCountUp, ButtonIconCountDown } from '../../ui'

const CounterWrapper = styled('div')`
  display: flex;
  gap: 10px;
  justify-content: center;
`
const Quantity = styled('p')`
  display: block;
  margin: auto;
`
interface CartCounterProps {
  productId: string
  quantity: number
}

export const CartCounter: React.VFC<CartCounterProps> = ({
  quantity,
  productId
}) => {
  const { countDownProduct, countUpProduct } = useCartContext()

  const handleCountUp = () => {
    countUpProduct(productId)
  }
  const handleCountDown = () => {
    countDownProduct(productId)
  }

  return (
    <CounterWrapper>
      <ButtonIconCountDown onClick={handleCountDown} />
      <Quantity>{quantity}</Quantity>
      <ButtonIconCountUp onClick={handleCountUp} />
    </CounterWrapper>
  )
}
