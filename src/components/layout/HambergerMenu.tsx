import Hamburger from 'hamburger-react'
import { useHistory } from 'react-router-dom'
import styled from '@emotion/styled'
import { ButtonLink, ButtonIconStore } from '../ui'
import { useAuthContext } from '../../hooks/useContextClient'

const ResponsiveHeader = styled('div')`
  justify-content: flex-end;
  margin: 0 auto;
  padding: 15px 0;
  width: 95%;
`
const Head = styled('ul')`
  display: flex;
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
  const history = useHistory()
  const { user } = useAuthContext()
  if (!user) throw new Error('we cant find your account')

  const closeHamburger = (path: string) => {
    history.push(path)
  }

  return (
    <ResponsiveHeader>
      <Head>
        <Logo>
          <ButtonIconStore
            onClick={() => history.push('/')}
            color="secondary"
          />
          <span>Temanashi</span>
        </Logo>
        <Hamburger toggled={isOpen} toggle={setIsOpen} color="white" />
      </Head>
      {isOpen && (
        <Menu>
          <ButtonLink onClick={() => closeHamburger('/')}>Dashboard</ButtonLink>
          <ButtonLink onClick={() => closeHamburger('/create/product/')}>
            New Furniture
          </ButtonLink>
          <ButtonLink onClick={() => closeHamburger('/diagnose/')}>
            Diagnose
          </ButtonLink>
          <ButtonLink onClick={() => closeHamburger('/cart')}>
            Shopping Cart
          </ButtonLink>
          <ButtonLink onClick={() => closeHamburger(`/users/${user.uid}/`)}>
            My Page
          </ButtonLink>
        </Menu>
      )}
    </ResponsiveHeader>
  )
}
