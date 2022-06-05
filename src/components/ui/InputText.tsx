import { TextField } from "@mui/material";
import styled from "@emotion/styled";
import { UseFormRegisterReturn } from "react-hook-form";

const Text = styled(TextField)`
  width: 100%;
  margin-top: 6px;
  background-color: "white";
`;

const Label = styled("p")`
  font-size: 12px;
  font-weight: bold;
`;

export interface TextFieldProps {
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  register?: UseFormRegisterReturn;
  name?: string;
  type?: "text" | "password" | "email" | "number" | "tel" | "url" | "search";
  label?: string;
  disabled?: boolean;
  placeholder?: string;
  autoFocus?: boolean;
  error?: boolean;
  helperText?: string;
  pattern?: string;
  maxLength?: number;
  inputRef?: React.RefObject<HTMLInputElement>;
  value?: string;
  size?: "small";
  multiline?: boolean;
}

const InputText: React.VFC<TextFieldProps> = ({
  type = "text",
  name,
  label,
  placeholder,
  disabled = false,
  autoFocus = false,
  value,
  maxLength = 255,
  error = false,
  pattern,
  helperText = "",
  inputRef = null,
  register,
  onChange,
  onKeyDown,
  onBlur,
  onFocus,
  size,
  multiline = false,
}) => {
  return (
    <div>
      {label && <Label>{label}</Label>}
      <Text
        onChange={onChange}
        onKeyDown={onKeyDown}
        onBlur={onBlur}
        onFocus={onFocus}
        type={type}
        name={name}
        disabled={disabled}
        autoFocus={autoFocus}
        placeholder={placeholder}
        value={value}
        error={error}
        helperText={helperText}
        inputRef={inputRef}
        size={size}
        multiline={multiline}
        inputProps={{
          maxLength,
          pattern,
        }}
        {...register}
      />
    </div>
  );
};

export default InputText;
