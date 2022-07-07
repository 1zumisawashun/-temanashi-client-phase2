import styled from "@emotion/styled";
import ModalUnstyled from "@mui/base/ModalUnstyled";
import { ElementType } from "react";
// 参考記事:https://mui.com/base/react-modal/

const StyledModal = styled(ModalUnstyled)`
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

const ModalInner = styled("div")<{ size: string }>`
  background-color: white;
  border-radius: 10px;
  max-height: calc(100vh - 64px);
  padding: 30px 0;
  width: ${({ size }) => (size === "small" ? "600px" : "800px")};
`;

const Title = styled("div")`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  text-align: center;
`;

const SubTitle = styled("div")`
  font-size: 16px;
  margin-bottom: 30px;
  text-align: center;
  white-space: pre-line;
`;

const ContentWrapper = styled("div")`
  max-height: calc(100vh - 300px);
  overflow-y: scroll;
  padding: 0 30px;
`;

const FooterWrapper = styled("div")`
  display: flex;
  gap: 30px;
  justify-content: center;
  padding-top: 30px;
`;

export interface BasicModalProps {
  className?: string;
  title: string;
  subtitle?: string;
  contents?: JSX.Element;
  footer: JSX.Element;
  open: boolean;
  size?: "small" | "medium";
  handleOpen: () => void;
}

const BasicModal: React.VFC<BasicModalProps> = ({
  open = false,
  title,
  subtitle,
  contents,
  footer,
  size = "small",
  handleOpen,
}) => {
  return (
    <StyledModal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={handleOpen}
      components={{ Backdrop }}
      closeAfterTransition
    >
      <ModalInner size={size}>
        <div>
          <Title>{title}</Title>
          {subtitle && <SubTitle>{subtitle}</SubTitle>}
        </div>
        <ContentWrapper>{contents}</ContentWrapper>
        <FooterWrapper>{footer}</FooterWrapper>
      </ModalInner>
    </StyledModal>
  );
};

export default BasicModal;
