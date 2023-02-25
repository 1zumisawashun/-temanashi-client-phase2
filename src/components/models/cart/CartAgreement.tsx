import styled from '@emotion/styled'
import { useState } from 'react'
import { InputCheckbox, Button } from '../../uis'
import { SquareIcon, SquareIconBlank } from '../../uis/InputCheckbox'
import { mediaQuery } from '../../../functionals/hooks'

const CartAgreementContainer = styled('div')`
  background: white;
  border-radius: 12px;
  box-shadow: 0 13px 21px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-evenly;
  margin: 30px auto 0;
  padding: 20px 0;
  width: 100%;
  ${mediaQuery('sp')} {
    flex-wrap: wrap;
  }
`

interface CartAgreementProps {
  onClick: () => void
  isLoading: boolean
}

export const CartAgreement: React.VFC<CartAgreementProps> = ({
  onClick,
  isLoading
}) => {
  const [isAccepted, setIsAccepted] = useState<boolean>(false)

  const handleCheckbox = () => {
    setIsAccepted((prev) => !prev)
  }

  return (
    <CartAgreementContainer>
      <InputCheckbox
        label="利用規約に同意しますか？"
        checked={!isAccepted}
        value=""
        onChange={handleCheckbox}
        icon={<SquareIcon content="OK" />}
        checkedIcon={<SquareIconBlank content="OK" />}
      />
      <Button isDisabled={!isAccepted} onClick={onClick} isLoading={isLoading}>
        購入する
      </Button>
    </CartAgreementContainer>
  )
}
