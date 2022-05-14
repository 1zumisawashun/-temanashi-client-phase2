import Avatar from "./Avatar";
import { useAuthContext } from "../../hooks/useAuthContext";
import { FC } from "react";
import TextButton from "./TextButton";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SendIcon from "@mui/icons-material/Send";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ContentPasteSearchIcon from "@mui/icons-material/ContentPasteSearch";

const Sidebar: FC = () => {
  const { user } = useAuthContext();
  if (!user) throw new Error("we cant find your account");

  return (
    <div className="sidebar">
      <div className="sidebar-content">
        <div className="user">
          <TextButton path={`/users/${user.uid}`}>
            {user.photoURL && <Avatar src={user.photoURL} />}
            <p>hey {user.displayName}</p>
          </TextButton>
        </div>
        <nav className="links">
          <ul>
            <li>
              <TextButton path="/" icon={<DashboardIcon />}>
                Dashboard
              </TextButton>
            </li>
            <li>
              <TextButton path="/create/product" icon={<SendIcon />}>
                New Product
              </TextButton>
            </li>
            <li>
              <TextButton path="/diagnose" icon={<ContentPasteSearchIcon />}>
                Diagnose
              </TextButton>
            </li>
            <li>
              <TextButton path="/cart" icon={<ShoppingCartIcon />}>
                Shopping Cart
              </TextButton>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
