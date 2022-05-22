import Temple from "../../assets/icon/icon_temple.svg";
import { useState } from "react";
import HamburgerMenu from "./HambergerMenu";

const Header: React.VFC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={!isOpen ? "navbar" : "navbar -active"}>
      <ul className="wrapper">
        {!isOpen && (
          <li className="logo">
            <img src={Temple} alt="" />
            <span>Temanashi</span>
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
