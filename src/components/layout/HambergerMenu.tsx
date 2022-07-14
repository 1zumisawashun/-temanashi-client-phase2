import Hamburger from 'hamburger-react'
import { ButtonLink, ButtonIconStore } from '../ui'
import { useAuthContext } from '../../hooks/useContextClient'
import { useHistory } from 'react-router-dom'

interface HamburgerMenuProp {
  state: boolean
  setState: React.Dispatch<React.SetStateAction<boolean>>
}

export const HambergerMenu: React.VFC<HamburgerMenuProp> = ({
  state,
  setState
}) => {
  const history = useHistory()
  const { user } = useAuthContext()
  if (!user) throw new Error('we cant find your account')

  const closeHamburger = (path: string) => {
    document.body.style.overflow = ''
    setState(!state)
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
          <Hamburger toggled={state} toggle={setState} color="#f4f4f4" />
        </li>
      </ul>
      {state && (
        <div className="responsive-overlay">
          <ul className="menu">
            <li className="hamburger-link">
              <ButtonLink onClick={() => closeHamburger('/')}>
                Dashboard
              </ButtonLink>
            </li>
            <li className="hamburger-link">
              <ButtonLink onClick={() => closeHamburger('/create/furniture')}>
                New Furniture
              </ButtonLink>
            </li>
            <li className="hamburger-link">
              <ButtonLink onClick={() => closeHamburger('/diagnose')}>
                Diagnose
              </ButtonLink>
            </li>
            <li className="hamburger-link">
              <ButtonLink
                onClick={() => closeHamburger(`/users/${user.uid}/cart`)}
              >
                Shopping Cart
              </ButtonLink>
            </li>
            <li className="hamburger-link">
              <ButtonLink
                onClick={() => closeHamburger(`/users/${user.uid}/favorite`)}
              >
                My Page
              </ButtonLink>
            </li>
          </ul>
        </div>
      )}
    </div>
  )
}
