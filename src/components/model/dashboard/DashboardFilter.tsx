import { filterList } from "../../../utilities/constant";

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
