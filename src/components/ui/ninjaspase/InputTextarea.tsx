import { TextField, FormControlLabel } from "@mui/material";
import styled from "@emotion/styled";
import { UseFormRegisterReturn } from "react-hook-form";

const StyledFormControl = styled(FormControlLabel)`
  background-color: transparent;
  justify-content: space-between;
  display: flex;
  align-items: start;
  color: #84bcb4;
  margin: 20px;
  .MuiTypography-root {
    font-weight: bold;
  }
`;

// MuiInputBase-root
const Text = styled(TextField)`
  width: -webkit-fill-available;
  margin: 20px auto;
  border: 1px solid #84bcb4;
  border-radius: 10px;
`;

export interface InputTextareaProps {
  // NOTE:アクション
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLTextAreaElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLTextAreaElement>) => void;
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
  maxLength?: number;
  maxRows?: number;
  readOnly?: boolean;
}

export const InputTextareaCustom: React.VFC<InputTextareaProps> = ({
  onChange,
  onKeyDown,
  onBlur,
  onFocus,
  register,
  error = false,
  helperText,
  label = "",
  value,
  disabled = false,
  placeholder,
  type = "text",
  autoFocus = false,
  maxLength = 1000,
  maxRows = 50,
  readOnly,
}) => {
  return (
    <StyledFormControl
      control={
        <Text
          onChange={onChange}
          onKeyDown={() => onKeyDown}
          onBlur={onBlur}
          onFocus={onFocus}
          error={error}
          helperText={helperText}
          multiline
          rows={4}
          tabIndex={0}
          id={label}
          type={type}
          disabled={disabled}
          autoFocus={autoFocus}
          placeholder={placeholder}
          value={value}
          maxRows={maxRows}
          variant="standard"
          sx={{ p: 2 }}
          inputProps={{
            maxLength,
            style: {
              // height: "127px",
            },
            readOnly,
          }}
          {...register}
        />
      }
      label={label}
      labelPlacement="top"
    />
  );
};
