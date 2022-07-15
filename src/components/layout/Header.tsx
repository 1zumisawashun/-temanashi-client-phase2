import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { HambergerMenu } from './HambergerMenu'
import { ButtonIconStore } from '../ui'

export const Header: React.VFC = () => {
  const history = useHistory()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className={!isOpen ? 'navbar' : 'navbar -active'}>
      <ul className="wrapper">
        {!isOpen && (
          <li className="logo">
            <ButtonIconStore onClick={() => history.push('/')} />
            <span>temanashi client</span>
          </li>
        )}
      </ul>
      <div className="responsive-wrapper">
        <HambergerMenu state={isOpen} setState={setIsOpen} />
      </div>
    </div>
  )
}
