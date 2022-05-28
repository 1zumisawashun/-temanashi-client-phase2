import styled from "@emotion/styled";

const FooterContainer = styled("footer")`
  padding-bottom: 20px;
  text-align: center;
`;
const Copyright = styled("div")`
  color: gray;
  font-size: 14px;
  display: inline-block;
  padding: 20px;
  border-top: 1px solid gray;
`;

const Footer: React.VFC = () => {
  return (
    <FooterContainer>
      <Copyright>Copyright 2022 temanashi</Copyright>
    </FooterContainer>
  );
};
export default Footer;
