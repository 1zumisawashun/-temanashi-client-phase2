import styled from "@emotion/styled";

const FooterContainer = styled("footer")`
  padding: 40px;
  text-align: center;
  background: $lighthouse;
`;
const Copyright = styled("div")`
  color: $shale;
  font-size: 14px;
  display: inline-block;
  padding: 20px;
  border-top: 1px solid $shale;
`;

const Footer: React.VFC = () => {
  return (
    <FooterContainer>
      <Copyright>Copyright 2022 cafelog</Copyright>
    </FooterContainer>
  );
};
export default Footer;
