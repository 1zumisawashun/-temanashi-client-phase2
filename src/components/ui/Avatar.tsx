import styled from "@emotion/styled";

const AvatarWrapper = styled("div")`
  display: inline-block;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  overflow: hidden;
`;
const AvatarImage = styled("img")`
  width: 100%;
  height: 100%;
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
