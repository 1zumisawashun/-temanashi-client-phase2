import Loader from "react-loader-spinner";
import styled from "@emotion/styled";

const LoadingContainer = styled("div")`
  position: fixed;
  z-index: 1300;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Backdrop = styled("div")`
  // NOTE:z-indexを-1にすることでInner以降でのz-indexの影響をなくす
  z-index: -1;
  position: fixed;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  -webkit-tap-highlight-color: transparent;
`;

const Inner = styled("div")`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
`;

const Loading: React.VFC = () => {
  return (
    <LoadingContainer>
      <Backdrop>
        <Inner>
          <Loader
            type="RevolvingDot"
            color="#84bcb4"
            height={100}
            width={100}
          />
        </Inner>
      </Backdrop>
    </LoadingContainer>
  );
};
export default Loading;
