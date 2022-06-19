import Loader from "react-loader-spinner";
import styled from "@emotion/styled";

const LoadingContainer = styled("div")`
  align-items: center;
  bottom: 0;
  display: flex;
  justify-content: center;
  left: 0;
  position: fixed;
  right: 0;
  top: 0;
  z-index: 1300;
`;

const Backdrop = styled("div")`
  background-color: rgba(0, 0, 0, 0.5);
  bottom: 0;
  left: 0;
  position: fixed;
  right: 0;
  -webkit-tap-highlight-color: transparent;
  top: 0;
  z-index: -1;
`;

const Inner = styled("div")`
  left: 50%;
  position: absolute;
  text-align: center;
  top: 50%;
  transform: translate(-50%, -50%);
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
