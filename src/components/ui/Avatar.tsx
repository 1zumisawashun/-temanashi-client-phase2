interface AvatarProps {
  src: string;
}

const Avatar: React.VFC<AvatarProps> = ({ src }) => {
  return (
    <>
      {src && (
        <div className="avatar">
          <img src={src} alt="user avatar" />
        </div>
      )}
    </>
  );
};
export default Avatar;
