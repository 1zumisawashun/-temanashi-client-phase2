import styled from "@emotion/styled";

const AvatarWrapper = styled("div")`
  border-radius: 50%;
  display: inline-block;
  height: 50px;
  overflow: hidden;
  width: 50px;
`;
const AvatarImage = styled("img")`
  height: 100%;
  width: 100%;
`;

interface AvatarProps {
  src: string;
}

const Avatar: React.VFC<AvatarProps> = ({ src }) => {
  return (
    <>
      {src && (
        <AvatarWrapper>
          <AvatarImage src={src} alt="user avatar" />
        </AvatarWrapper>
      )}
    </>
  );
};
export default Avatar;
