import { useAuthContext, useCartContext } from "../../hooks/useContextClient";
import { ButtonNavlink, Divider, Avatar } from "../ui";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SendIcon from "@mui/icons-material/Send";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ContentPasteSearchIcon from "@mui/icons-material/ContentPasteSearch";
import styled from "@emotion/styled";
import Badge from "@mui/material/Badge";
import { css } from "@emotion/css";

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
/**
 * 小コンポーネントに送るために作成
 * styleをコンポーネントに当てるとCSSPropertiesが型になってしまう
 * classNameをコンポーネントに当てるとstringになる＞こっちを採用したい
 */
export const CustomStyle = css`
  justify-content: flex-start;
  padding-left: 40px;
`;

export const Sidebar: React.VFC = () => {
  const { user } = useAuthContext();
  if (!user) throw new Error("we cant find your account");
  const { cart } = useCartContext();

  return (
    <SidebarContainer>
      <SidebarInner>
        <SidebarUser>
          <ButtonNavlink path={`/users/${user.uid}`}>
            <SidebarUserInner>
              {user.photoURL && <Avatar src={user.photoURL} size="medium" />}
              <p>hey {user.displayName}</p>
            </SidebarUserInner>
          </ButtonNavlink>
          <Divider />
        </SidebarUser>
        <SidebarLinks>
          <ul>
            <SidebarLinkItem>
              <ButtonNavlink
                path="/"
                icon={<DashboardIcon />}
                className={CustomStyle}
              >
                Dashboard
              </ButtonNavlink>
            </SidebarLinkItem>
            <SidebarLinkItem>
              <ButtonNavlink
                path="/create/product"
                icon={<SendIcon />}
                className={CustomStyle}
              >
                New Product
              </ButtonNavlink>
            </SidebarLinkItem>
            <SidebarLinkItem>
              <ButtonNavlink
                path="/diagnose"
                icon={<ContentPasteSearchIcon />}
                className={CustomStyle}
              >
                Diagnose
              </ButtonNavlink>
            </SidebarLinkItem>
            <SidebarLinkItem>
              <ButtonNavlink
                path="/cart"
                icon={
                  <Badge badgeContent={cart.length} color="error">
                    <ShoppingCartIcon />
                  </Badge>
                }
                className={CustomStyle}
              >
                Shopping Cart
              </ButtonNavlink>
            </SidebarLinkItem>
          </ul>
        </SidebarLinks>
      </SidebarInner>
    </SidebarContainer>
  );
};
