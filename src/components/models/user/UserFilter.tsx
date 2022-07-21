import styled from '@emotion/styled'
import { userList } from '../../../utilities/constant'

const FilterContainer = styled('div')`
  border-radius: 4px;
  box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.1);
  width: 100%;
`
const FilterNav = styled('nav')`
  background-color: white;
  display: flex;
  overflow-x: auto;
  padding: 10px;
  &::-webkit-scrollbar {
    height: 5px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #84bcb4;
    border-radius: 100px;
  }
`
const FilterButton = styled('button')`
  background: transparent;
  border: 0;
  border-right: 1px solid #e4e4e4;
  color: #999;
  cursor: pointer;
  font-family: inherit;
  font-size: 0.9em;
  font-weight: bold;
  padding: 0 15px;
  &:last-child {
    border: 0;
  }
  &.active {
    color: #84bcb4;
    transition: 0.2s ease;
    transition-delay: 0.1s;
  }
`

interface UserFilterProps {
  currentFilter: string
  changeFilter: (newFilter: string) => void
}

export const UserFilter: React.VFC<UserFilterProps> = ({
  currentFilter,
  changeFilter
}) => {
  const handleClick = (newFilter: string) => {
    changeFilter(newFilter)
  }
  return (
    <FilterContainer>
      <FilterNav>
        {userList.map((f) => (
          <FilterButton
            key={f}
            onClick={() => handleClick(f)}
            className={currentFilter === f ? 'active' : ''}
          >
            {f}
          </FilterButton>
        ))}
      </FilterNav>
    </FilterContainer>
  )
}
