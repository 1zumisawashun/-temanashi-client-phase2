import styled from "@emotion/styled";
import { Switch, FormControlLabel, styled as muiStyled } from "@mui/material";

const Container = styled(FormControlLabel)`
  width: 72px;
  margin-left: 0;
`;

const SwitchContainer = styled("div")`
  display: block;
`;

const Label = styled("p")`
  margin-bottom: 4px;
  font-size: 12px;
  font-weight: 600;
`;
interface SwitchFormProps {
  label?: string;
  checked?: boolean;
  offLabel?: string;
  onLabel?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  value?: string;
}

const CustomSwitch = muiStyled(Switch)(
  (props: { on: string; off: string }) => ({
    width: "72px",
    height: "28px",
    padding: "0px",
    "& .MuiSwitch-switchBase": {
      color: "#818181",
      padding: "2px",
      "&.Mui-checked": {
        color: "#005BAC !important",
        transform: "translateX(44px) !important",
      },
      "&.Mui-checked + .MuiSwitch-track": {
        "&:after": {
          fontSize: "12px",
          color: "white",
          content: `"${props.on}"`,
          left: "11px",
        },
        "&:before": {
          display: "none",
        },
      },
      "&$checked": {
        "& + $track": {
          backgroundColor: "#005BAC",
        },
      },
    },
    "& .MuiSwitch-track": {
      display: "flex",
      alignItems: "center",
      borderRadius: "20px",
      backgroundColor: "#B5B5B5",
      opacity: "1 !important",
      "&:after, &:before": {
        position: "absolute",
        fontWeight: "bold",
      },
      "&:before": {
        fontSize: "12px",
        color: "black",
        content: `"${props.off}"`,
        right: "8px",
      },
    },
    "& .MuiSwitch-thumb": {
      color: "white",
      width: "22px",
      height: "22px",
      margin: "1px",
    },
  })
);

export const SwitchForm: React.VFC<SwitchFormProps> = ({
  label,
  offLabel,
  onLabel,
  checked,
  onChange,
  disabled = false,
  value,
}) => {
  return (
    <div>
      {label && <Label>{label}</Label>}
      <Container
        control={
          <SwitchContainer>
            <CustomSwitch
              onChange={onChange}
              // on={onLabel}
              // off={offLabel}
              checked={checked}
              disabled={disabled}
              value={value}
            />
          </SwitchContainer>
        }
        label={""}
      />
    </div>
  );
};
