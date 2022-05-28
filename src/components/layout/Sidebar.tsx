import Avatar from "../ui/Avatar";
import { useAuthContext } from "../../hooks/useContextClient";
import { NavlinkButton } from "../ui";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SendIcon from "@mui/icons-material/Send";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ContentPasteSearchIcon from "@mui/icons-material/ContentPasteSearch";

const Sidebar: React.VFC = () => {
  const { user } = useAuthContext();
  if (!user) throw new Error("we cant find your account");

  return (
    <div className="sidebar">
      <div className="sidebar-content">
        <div className="user">
          <NavlinkButton path={`/users/${user.uid}`}>
            {user.photoURL && <Avatar src={user.photoURL} />}
            <p>hey {user.displayName}</p>
          </NavlinkButton>
        </div>
        <nav className="links">
          <ul>
            <li>
              <NavlinkButton path="/" icon={<DashboardIcon />}>
                Dashboard
              </NavlinkButton>
            </li>
            <li>
              <NavlinkButton path="/create/product" icon={<SendIcon />}>
                New Product
              </NavlinkButton>
            </li>
            <li>
              <NavlinkButton path="/diagnose" icon={<ContentPasteSearchIcon />}>
                Diagnose
              </NavlinkButton>
            </li>
            <li>
              <NavlinkButton path="/cart" icon={<ShoppingCartIcon />}>
                Shopping Cart
              </NavlinkButton>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
