import Hamburger from 'hamburger-react'
import { useHistory } from 'react-router-dom'
import { ButtonLink, ButtonIconStore } from '../ui'
import { useAuthContext } from '../../hooks/useContextClient'

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
    <div className="responsive-header">
      <ul className="head">
        <li className="logo">
          <ButtonIconStore onClick={() => history.push('/')} />
          <span>Temanashi</span>
        </li>
        <li className="hamburger-box">
          <Hamburger toggled={isOpen} toggle={setIsOpen} color="#f4f4f4" />
        </li>
      </ul>
      {isOpen && (
        <div className="responsive-overlay">
          <ul className="menu">
            <li className="hamburger-link">
              <ButtonLink onClick={() => closeHamburger('/')}>
                Dashboard
              </ButtonLink>
            </li>
            <li className="hamburger-link">
              <ButtonLink onClick={() => closeHamburger('/create/product/')}>
                New Furniture
              </ButtonLink>
            </li>
            <li className="hamburger-link">
              <ButtonLink onClick={() => closeHamburger('/diagnose/')}>
                Diagnose
              </ButtonLink>
            </li>
            <li className="hamburger-link">
              <ButtonLink onClick={() => closeHamburger('/cart')}>
                Shopping Cart
              </ButtonLink>
            </li>
            <li className="hamburger-link">
              <ButtonLink onClick={() => closeHamburger(`/users/${user.uid}/`)}>
                My Page
              </ButtonLink>
            </li>
          </ul>
        </div>
      )}
    </div>
  )
}
