import { Checkbox, FormControlLabel } from "@mui/material";
import styled from "@emotion/styled";
import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";

export interface CheckBoxProps {
  label: string | ReactJSXElement;
  disabled?: boolean;
  checked: boolean;
  size?: "small" | "medium";
  color?:
    | "default"
    | "primary"
    | "secondary"
    | "error"
    | "info"
    | "success"
    | "warning";
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const StyledFormControlLabel = styled(FormControlLabel)`
  font-size: 16px;
`;
const StyledCheckBox = styled(Checkbox)`
  padding: 6px;
`;

export const InputCheckbox: React.VFC<CheckBoxProps> = ({
  label = "",
  checked = false,
  disabled = false,
  size = "small",
  color = "primary",
  value = "",
  onChange,
}) => {
  return (
    <StyledFormControlLabel
      control={
        <StyledCheckBox
          onChange={onChange}
          checked={checked}
          disabled={disabled}
          size={size}
          color={color}
          value={value}
        />
      }
      label={label}
    />
  );
};
