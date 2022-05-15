import { FC } from "react";
import Hamburger from "hamburger-react";
import WhiteTempleIcon from "../../assets/icon/icon_temple_white.svg";
import BasicButton from "./BasicButton";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useHistory } from "react-router-dom";

type Prop = {
  state: boolean;
  setState: React.Dispatch<React.SetStateAction<boolean>>;
};

const HamburgerMenu: FC<Prop> = ({ state, setState }) => {
  const history = useHistory();
  const { user } = useAuthContext();
  if (!user) throw new Error("we cant find your account");

  const closeHamburger = (path: string) => {
    document.body.style.overflow = "";
    setState(!state);
    history.push(path);
  };

  const handleClick = () => {
    console.log("handleClick");
  };

  const scrollTop = (): number => {
    return Math.max(
      window.pageYOffset,
      document.documentElement.scrollTop,
      document.body.scrollTop
    );
  };

  const styles = { top: scrollTop() };

  return (
    <>
      <div className="responsive-header">
        <ul className="head">
          <li className="logo">
            <img src={WhiteTempleIcon} alt="" />
            <span>Temanashi</span>
          </li>
          <li className="hamburger-box" onClick={handleClick}>
            <Hamburger toggled={state} toggle={setState} color="#f4f4f4" />
          </li>
        </ul>
        {state && (
          <div className="responsive-overlay" style={styles}>
            <ul className="menu">
              <li className="hamburger-link">
                <BasicButton
                  styleName="-link"
                  onClick={() => closeHamburger("/")}
                >
                  Dashboard
                </BasicButton>
              </li>
              <li className="hamburger-link">
                <BasicButton
                  styleName="-link"
                  onClick={() => closeHamburger("/create/furniture")}
                >
                  New Furniture
                </BasicButton>
              </li>
              <li className="hamburger-link">
                <BasicButton
                  styleName="-link"
                  onClick={() => closeHamburger("/diagnose")}
                >
                  Diagnose
                </BasicButton>
              </li>
              <li className="hamburger-link">
                <BasicButton
                  styleName="-link"
                  onClick={() => closeHamburger(`/users/${user.uid}/cart`)}
                >
                  Shopping Cart
                </BasicButton>
              </li>
              <li className="hamburger-link">
                <BasicButton
                  styleName="-link"
                  onClick={() => closeHamburger(`/users/${user.uid}/favorite`)}
                >
                  My Page
                </BasicButton>
              </li>
            </ul>
          </div>
        )}
      </div>
    </>
  );
};

export default HamburgerMenu;
