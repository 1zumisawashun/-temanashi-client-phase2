import { FC } from "react";
import { filterList } from "../../../utilities/constant";

type Props = {
  currentFilter: String;
  changeFilter: Function;
};

const DashboardFilter: FC<Props> = ({ currentFilter, changeFilter }) => {
  const handleClick = (newFilter: String) => {
    changeFilter(newFilter);
  };
  return (
    <div className="product-filter-container">
      <nav>
        <p className="title">FILTER BY</p>
        {filterList.map((f) => (
          <button
            key={f}
            onClick={() => handleClick(f)}
            className={currentFilter === f ? "active" : ""}
          >
            {f}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default DashboardFilter;
