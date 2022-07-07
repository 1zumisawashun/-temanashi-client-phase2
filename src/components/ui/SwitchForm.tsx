import styled from "@emotion/styled";
import { Switch, FormControlLabel, styled as muiStyled } from "@mui/material";

const Container = styled(FormControlLabel)`
  margin-left: 0;
  width: 72px;
`;

const SwitchContainer = styled("div")`
  display: block;
`;

const Label = styled("p")`
  font-size: 12px;
  font-weight: 600;
  margin-bottom: 4px;
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

const CustomSwitch = muiStyled(Switch)(() => ({
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
        color: "white",
        content: `''`,
        fontSize: "12px",
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
    alignItems: "center",
    backgroundColor: "#B5B5B5",
    borderRadius: "20px",
    display: "flex",
    opacity: "1 !important",
    "&:after, &:before": {
      fontWeight: "bold",
      position: "absolute",
    },
    "&:before": {
      color: "black",
      content: `''`,
      fontSize: "12px",
      right: "8px",
    },
  },
  "& .MuiSwitch-thumb": {
    color: "white",
    height: "22px",
    margin: "1px",
    width: "22px",
  },
}));

export const SwitchForm: React.VFC<SwitchFormProps> = ({
  label,
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
