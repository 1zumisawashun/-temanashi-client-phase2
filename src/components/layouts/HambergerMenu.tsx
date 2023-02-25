import Hamburger from 'hamburger-react'
import styled from '@emotion/styled'
import { ButtonLink, ButtonIconStore } from '../uis'
import { useAuthContext } from '../../functionals/hooks/useContextClient'

const ResponsiveHeader = styled('div')`
  justify-content: flex-end;
  margin: 0 auto;
  padding: 10px 0;
  width: 95%;
`
const Head = styled('div')`
  align-items: center;
  display: flex;
  justify-content: center;
`
const Logo = styled('ul')`
  align-items: center;
  color: white;
  display: flex;
  font-weight: bold;
  letter-spacing: 1px;
  margin-right: auto;
`
const Menu = styled('div')`
  animation: fadeIn 0.3s ease-in;
  display: grid;
  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`

interface HamburgerMenuProp {
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

/**
 * stateとsetStateをhamburger-reactのコンポーネントに投げると
 * よしなに表示・非表示のハンドリングをしてくれる
 */
export const HambergerMenu: React.VFC<HamburgerMenuProp> = ({
  isOpen,
  setIsOpen
}) => {
  const { user } = useAuthContext()
  if (!user) throw new Error('we cant find your account')

  return (
    <ResponsiveHeader>
      <Head>
        <Logo>
          <ButtonLink path="/" icon={<ButtonIconStore />}>
            Temanashi
          </ButtonLink>
        </Logo>
        <Hamburger toggled={isOpen} toggle={setIsOpen} color="white" />
      </Head>
      {isOpen && (
        <Menu>
          <ButtonLink path="/">Dashboard</ButtonLink>
          <ButtonLink path="create/product">New Furniture</ButtonLink>
          <ButtonLink path="/diagnose">Diagnose</ButtonLink>
          <ButtonLink path="/cart">Shopping Cart</ButtonLink>
          <ButtonLink path={`/users/${user.uid}`}>My Page</ButtonLink>
        </Menu>
      )}
    </ResponsiveHeader>
  )
}
