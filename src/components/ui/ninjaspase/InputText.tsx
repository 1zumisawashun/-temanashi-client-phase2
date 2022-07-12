import { TextField, FormControlLabel } from "@mui/material";
import styled from "@emotion/styled";
import { UseFormRegisterReturn } from "react-hook-form";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";

const StyledFormControl = styled("div")`
  background-color: transparent;
  justify-content: space-between;
  display: flex;
  color: #84bcb4;
  margin: 0 0 0 20px;
  font-weight: bold;
  .MuiInput-input {
    text-align: end;
  }
`;

const Text = styled(TextField)`
  width: 70%;
`;

const Label = styled("label")`
  margin: auto auto auto 0;
  font-size: 16px;
`;

export interface InputTextProps {
  // NOTE:アクション
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  // NOTE:エラーハンドリング
  register?: UseFormRegisterReturn;
  error?: boolean;
  helperText?: string;
  // NOTE:必須項目
  label?: string;
  value?: string;
  disabled?: boolean;
  placeholder?: string;
  type?: "text" | "password" | "email" | "number" | "tel" | "url" | "search";
  //NOTE:追加項目
  autoFocus?: boolean;
  name?: string;
  pattern?: string;
  maxLength?: number;
  inputRef?: React.RefObject<HTMLInputElement>;
  size?: "small";
}

export const InputTextCustom: React.VFC<InputTextProps> = ({
  onChange,
  onKeyDown,
  onBlur,
  onFocus,
  register,
  error = false,
  helperText = "",
  label = "店舗名（30文字）",
  value,
  disabled = false,
  placeholder,
  type = "text",
  autoFocus = false,
  name,
  pattern,
  maxLength = 255,
  inputRef = null,
  size,
}) => {
  return (
    <StyledFormControl>
      <Label htmlFor={label}>{label}</Label>
      <Text
        onChange={onChange}
        onKeyDown={onKeyDown}
        onBlur={onBlur}
        onFocus={onFocus}
        type={type}
        name={name}
        id={label}
        disabled={disabled}
        autoFocus={autoFocus}
        placeholder={placeholder}
        value={value}
        error={error}
        helperText={helperText}
        inputRef={inputRef}
        size={size}
        variant="standard"
        sx={{ m: 2 }}
        inputProps={{
          maxLength,
          pattern,
          endAdornment: (
            <InputAdornment position="end">
              <IconButton>
                <ArrowForwardIosIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
        {...register}
      />
    </StyledFormControl>
  );
};
