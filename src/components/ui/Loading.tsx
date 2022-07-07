import Loader from "react-loader-spinner";
import styled from "@emotion/styled";
import * as React from "react";
import MuiBackdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

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

type LoadingProps = {
  color?: string;
};

export const Loading: React.VFC<LoadingProps> = ({ color = "#84bcb4" }) => {
  return (
    <LoadingContainer>
      <Backdrop>
        <Inner>
          <Loader type="RevolvingDot" color={color} height={100} width={100} />
        </Inner>
      </Backdrop>
    </LoadingContainer>
  );
};

export const LoadingMui: React.VFC = () => {
  return (
    <MuiBackdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open
    >
      <CircularProgress color="primary" />
    </MuiBackdrop>
  );
};
