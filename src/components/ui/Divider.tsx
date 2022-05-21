interface DividerProps {
  styleName?: string;
}

const Divider: React.VFC<DividerProps> = ({ styleName }) => {
  return (
    <>
      <div className={`divider ${styleName}`} />
    </>
  );
};
export default Divider;
