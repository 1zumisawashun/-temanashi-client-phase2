import { TextField } from "@mui/material";
import styled from "@emotion/styled";

const Text = styled(TextField)(() => ({
  width: "100%",
  marginTop: 6,
  backgroundColor: "white",
}));

const Label = styled("p")(() => ({
  fontSize: "12px",
  fontWeight: "600",
}));

export interface TextFieldProps {
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  // register?: UseFormRegisterReturn;
  name?: string;
  type?: "text" | "password" | "email" | "number" | "tel" | "url" | "search";
  label?: string;
  disabled?: boolean;
  placeholder?: string;
  autoFocus?: boolean;
  error?: boolean;
  pattern?: string;
  helperText?: string;
  maxLength?: number;
  inputRef?: React.RefObject<HTMLInputElement>;
  value?: string;
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
  // register,
  onChange,
  onKeyDown,
  onBlur,
  onFocus,
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
        inputProps={{
          maxLength,
          pattern,
        }}
        // {...register}
      />
    </div>
  );
};

export default InputText;
