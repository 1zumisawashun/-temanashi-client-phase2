import { FC } from "react";
import { userList } from "../../../utilities/constant";

type Props = {
  currentFilter: String;
  changeFilter: Function;
};

const UserFilter: FC<Props> = ({ currentFilter, changeFilter }) => {
  const handleClick = (newFilter: String) => {
    changeFilter(newFilter);
  };
  return (
    <div className="product-filter-container">
      <nav>
        <p className="title">FILTER BY</p>
        {userList.map((f) => (
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

export default UserFilter;
