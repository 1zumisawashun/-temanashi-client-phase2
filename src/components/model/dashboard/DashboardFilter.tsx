import { filterList } from "../../../utilities/constant";
import styled from "@emotion/styled";

const FilterContainer = styled("div")`
  margin: 30px auto 0;
  overflow-x: auto;
  white-space: nowrap;
  &::-webkit-scrollbar {
    height: 5px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 100px;
    background-color: #84bcb4;
  }
`;
const FilterNav = styled("nav")`
  width: fit-content;
  display: flex;
  padding: 10px;
  background-color: white;
  border-radius: 4px;
`;
const FilterTitle = styled("p")`
  width: 90px;
  font-weight: bold;
  font-size: 0.9em;
`;
const FilterButton = styled("button")`
  background: transparent;
  border: 0;
  font-family: inherit;
  font-weight: bold;
  color: #999;
  cursor: pointer;
  border-right: 1px solid #e4e4e4;
  font-size: 0.9em;
  padding: 0 15px;
  &:last-child {
    border: 0;
  }
  &.active {
    color: #84bcb4;
    transition: 0.2s ease;
    transition-delay: 0.1s;
  }
`;

type DashboardFilterProps = {
  currentFilter: String;
  changeFilter: Function;
};

const DashboardFilter: React.VFC<DashboardFilterProps> = ({
  currentFilter,
  changeFilter,
}) => {
  const handleClick = (newFilter: String) => {
    changeFilter(newFilter);
  };
  return (
    <FilterContainer>
      <FilterNav>
        <FilterTitle>FILTER BY</FilterTitle>
        {filterList.map((f) => (
          <FilterButton
            key={f}
            onClick={() => handleClick(f)}
            className={currentFilter === f ? "active" : ""}
          >
            {f}
          </FilterButton>
        ))}
      </FilterNav>
    </FilterContainer>
  );
};

export default DashboardFilter;
