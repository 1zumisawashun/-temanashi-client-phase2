import NotFoundIcon from "../../assets/icon/icon_not_found.svg";
import styled from "@emotion/styled";

const NotFoundItemContainer = styled("div")`
  margin: 10% 0;
  text-align: center;
`;
const Image = styled("img")`
  width: 35%;
`;
const Message = styled("p")`
  font-size: 1.5rem;
  font-weight: bold;
  color: #84bcb4;
  margin: 30px 0;
`;

const NotFoundItem: React.VFC = () => {
  return (
    <NotFoundItemContainer>
      <Image src={NotFoundIcon} alt="" />
      <Message>Not Found...</Message>
    </NotFoundItemContainer>
  );
};
export default NotFoundItem;
