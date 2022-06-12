import styled from "@emotion/styled";
import { Divider } from "../ui";

const FooterContainer = styled("footer")`
  padding-bottom: 20px;
  text-align: center;
`;
const Copyright = styled("div")`
  color: gray;
  font-size: 14px;
  display: inline-block;
  padding: 20px;
`;

const Footer: React.VFC = () => {
  return (
    <FooterContainer>
      <Divider />
      <Copyright>Copyright 2022 temanashi</Copyright>
    </FooterContainer>
  );
};
export default Footer;
