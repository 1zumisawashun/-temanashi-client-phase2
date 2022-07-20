import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import styled from '@emotion/styled'
import { HambergerMenu } from './HambergerMenu'
import { ButtonIconStore } from '../ui'
import { mediaQuery } from '../../hooks'

const HeaderContainer = styled('div')`
  box-sizing: border-box;
  padding: 50px 0 10px;
  width: 100%;
  ${mediaQuery('sp')} {
    background: #84bcb4;
    box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.05);
    height: 75px;
    padding: 0;
    transition-duration: 100ms;
    &.-active {
      background: #84bcb4;
      height: 300px;
      transition-duration: 100ms;
    }
  }
`
const HeaderWrapper = styled('ul')`
  align-items: center;
  display: flex;
  justify-content: flex-end;
  margin: 0 auto;
  ${mediaQuery('sp')} {
    display: none;
  }
`
const ResponsiveHeaderWrapper = styled('ul')`
  display: none;
  ${mediaQuery('sp')} {
    display: block;
  }
`
const Logo = styled('div')`
  align-items: center;
  color: #444;
  display: flex;
  font-weight: bold;
  letter-spacing: 1px;
  margin-right: auto;
`

export const Header: React.VFC = () => {
  const history = useHistory()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <HeaderContainer className={`${isOpen ? '-active' : ''}`}>
      <HeaderWrapper>
        {!isOpen && (
          <Logo>
            <ButtonIconStore onClick={() => history.push('/')} />
            <span>temanashi</span>
          </Logo>
        )}
      </HeaderWrapper>
      <ResponsiveHeaderWrapper>
        <HambergerMenu isOpen={isOpen} setIsOpen={setIsOpen} />
      </ResponsiveHeaderWrapper>
    </HeaderContainer>
  )
}
