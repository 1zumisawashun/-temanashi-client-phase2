import styled from "@emotion/styled";
import ModalUnstyled from "@mui/base/ModalUnstyled";

const StyledModal = styled(ModalUnstyled)`
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
  z-index: -1;
  position: fixed;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  -webkit-tap-highlight-color: transparent;
`;

const ModalInner = styled("div")<{ size: string }>`
  width: ${({ size }) => (size === "small" ? "600px" : "800px")};
  max-height: calc(100vh - 64px);
  padding: 30px 0;
  background-color: white;
  border-radius: 10px;
`;

const Title = styled("div")`
  margin-bottom: 20px;
  font-size: 24px;
  font-weight: bold;
  text-align: center;
`;

const SubTitle = styled("div")`
  margin-bottom: 30px;
  font-size: 16px;
  text-align: center;
  white-space: pre-line;
`;

const ContentWrapper = styled("div")`
  padding: 0 30px;
  max-height: calc(100vh - 300px);
  overflow-y: scroll;
`;

const FooterWrapper = styled("div")`
  display: flex;
  justify-content: center;
  gap: 30px;
  padding-top: 30px;
`;

export type ModalProps = {
  className?: string;
  title: string;
  subtitle?: string;
  contents?: JSX.Element;
  footer: JSX.Element;
  open: boolean;
  size?: "small" | "medium";
  handleOpen: () => void;
};

export const Modal: React.VFC<ModalProps> = ({
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
      aria-labelledby="unstyled-modal-title"
      aria-describedby="unstyled-modal-description"
      open={open}
      onClose={handleOpen}
      BackdropComponent={Backdrop}
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
