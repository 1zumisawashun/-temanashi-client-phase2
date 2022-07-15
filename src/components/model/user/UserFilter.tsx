import styled from '@emotion/styled'
import { userList } from '../../../utilities/constant'

const FilterContainer = styled('div')`
  box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.1);
  display: inline-block;
  margin: 30px auto 0;
  overflow-x: auto;
  white-space: nowrap;
  &::-webkit-scrollbar {
    height: 5px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #84bcb4;
    border-radius: 100px;
  }
`
const FilterNav = styled('nav')`
  background-color: white;
  border-radius: 4px;
  display: flex;
  padding: 10px;
  width: fit-content;
`
const FilterTitle = styled('p')`
  font-size: 0.9em;
  font-weight: bold;
  width: 90px;
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
        <FilterTitle>FILTER BY</FilterTitle>
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
