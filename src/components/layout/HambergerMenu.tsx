import Hamburger from "hamburger-react";
import { LinkButton, StoreButton } from "../ui";
import { useAuthContext } from "../../hooks/useContextClient";
import { useHistory } from "react-router-dom";

interface HamburgerMenuProp {
  state: boolean;
  setState: React.Dispatch<React.SetStateAction<boolean>>;
}

const HamburgerMenu: React.VFC<HamburgerMenuProp> = ({ state, setState }) => {
  const history = useHistory();
  const { user } = useAuthContext();
  if (!user) throw new Error("we cant find your account");

  const closeHamburger = (path: string) => {
    document.body.style.overflow = "";
    setState(!state);
    history.push(path);
  };

  return (
    <div className="responsive-header">
      <ul className="head">
        <li className="logo">
          <StoreButton onClick={() => history.push("/")} />
          <span>Temanashi</span>
        </li>
        <li className="hamburger-box">
          <Hamburger toggled={state} toggle={setState} color="#f4f4f4" />
        </li>
      </ul>
      {state && (
        <div className="responsive-overlay">
          <ul className="menu">
            <li className="hamburger-link">
              <LinkButton onClick={() => closeHamburger("/")}>
                Dashboard
              </LinkButton>
            </li>
            <li className="hamburger-link">
              <LinkButton onClick={() => closeHamburger("/create/furniture")}>
                New Furniture
              </LinkButton>
            </li>
            <li className="hamburger-link">
              <LinkButton onClick={() => closeHamburger("/diagnose")}>
                Diagnose
              </LinkButton>
            </li>
            <li className="hamburger-link">
              <LinkButton
                onClick={() => closeHamburger(`/users/${user.uid}/cart`)}
              >
                Shopping Cart
              </LinkButton>
            </li>
            <li className="hamburger-link">
              <LinkButton
                onClick={() => closeHamburger(`/users/${user.uid}/favorite`)}
              >
                My Page
              </LinkButton>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default HamburgerMenu;
