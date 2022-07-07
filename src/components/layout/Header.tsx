import { useState } from "react";
import HamburgerMenu from "./HambergerMenu";
import { StoreButton } from "../ui";
import { useHistory } from "react-router-dom";

const Header: React.VFC = () => {
  const history = useHistory();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={!isOpen ? "navbar" : "navbar -active"}>
      <ul className="wrapper">
        {!isOpen && (
          <li className="logo">
            <StoreButton onClick={() => history.push("/")} />
            <span>temanashi develop</span>
          </li>
        )}
      </ul>
      <div className="responsive-wrapper">
        <HamburgerMenu state={isOpen} setState={setIsOpen} />
      </div>
    </div>
  );
};

export default Header;
