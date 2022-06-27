import Avatar from "../ui/Avatar";
import { useAuthContext , useCartContext } from "../../hooks/useContextClient";
import { NavlinkButton, Divider } from "../ui";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SendIcon from "@mui/icons-material/Send";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ContentPasteSearchIcon from "@mui/icons-material/ContentPasteSearch";
import styled from "@emotion/styled";
import Badge from "@mui/material/Badge";

const SidebarContainer = styled("div")`
  background: #84bcb4;
  box-sizing: border-box;
  min-height: 100vh;
  min-width: 300px;
  position: relative;
  width: 300px;
`;
const SidebarInner = styled("div")`
  position: fixed;
  width: inherit;
`;
const SidebarUser = styled("div")`
  letter-spacing: 1px;
  padding: 40px 30px;
  /* font-weight: bold; */
  text-align: center;
`;
const SidebarUserInner = styled("div")`
  color: #f4f4f4;
  font-weight: bold;
  text-decoration: none;
`;
const SidebarLinks = styled("nav")`
  margin-left: 30px;
  margin-top: 30px;
`;
const SidebarLinkItem = styled("li")`
  padding: 10px 0;
  > a {
    color: #f4f4f4;
  }
  > a.active {
    background: #f4f4f4;
    border-radius: 20px 0 0 20px;
    color: #555;
  }
`;


const Sidebar: React.VFC = () => {
  const { user } = useAuthContext();
  if (!user) throw new Error("we cant find your account");
  const { cart } = useCartContext();

  return (
    <SidebarContainer>
      <SidebarInner>
        <SidebarUser>
          <NavlinkButton path={`/users/${user.uid}`}>
            <SidebarUserInner>
              {user.photoURL && <Avatar src={user.photoURL} />}
              <p>hey {user.displayName}</p>
            </SidebarUserInner>
          </NavlinkButton>
          <Divider />
        </SidebarUser>
        <SidebarLinks>
          <ul>
            <SidebarLinkItem>
              <NavlinkButton path="/" icon={<DashboardIcon />}>
                Dashboard
              </NavlinkButton>
            </SidebarLinkItem>
            <SidebarLinkItem>
              <NavlinkButton path="/create/product" icon={<SendIcon />}>
                New Product
              </NavlinkButton>
            </SidebarLinkItem>
            <SidebarLinkItem>
              <NavlinkButton path="/diagnose" icon={<ContentPasteSearchIcon />}>
                Diagnose
              </NavlinkButton>
            </SidebarLinkItem>
            <SidebarLinkItem>
              <NavlinkButton
                path="/cart"
                icon={
                  <Badge badgeContent={cart.length} color="secondary">
                    <ShoppingCartIcon />
                  </Badge>
                }
              >
                Shopping Cart
              </NavlinkButton>
            </SidebarLinkItem>
          </ul>
        </SidebarLinks>
      </SidebarInner>
    </SidebarContainer>
  );
};

export default Sidebar;
