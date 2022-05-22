import { userList } from "../../../utilities/constant";
interface UserFilterProps {
  currentFilter: String;
  changeFilter: Function;
}

const UserFilter: React.VFC<UserFilterProps> = ({
  currentFilter,
  changeFilter,
}) => {
  const handleClick = (newFilter: string) => {
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
