import React from "react";
import { TextField } from "@mui/material";
import styled from "@emotion/styled";
import type { UseFormRegisterReturn } from "react-hook-form";

const StyledTextField = styled(TextField)`
  background-color: white;
  font-size: 16px;
  margin-top: 6px;
  width: 100%;
`;

const StyledLabelText = styled("label")`
  font-size: 12px;
  font-weight: bold;
  margin-bottom: 4px;
`;

export type InputTextareaProps = {
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
};

export const InputTextarea: React.VFC<InputTextareaProps> = ({
  onChange,
  onKeyDown,
  onBlur,
  onFocus,
  register,
  error = false,
  helperText = "",
  label,
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
    <div>
      {label && <StyledLabelText htmlFor={label}>{label}</StyledLabelText>}
      <StyledTextField
        error={error}
        helperText={helperText}
        multiline
        rows={4}
        onChange={onChange}
        onKeyDown={() => onKeyDown}
        tabIndex={0}
        onBlur={onBlur}
        onFocus={onFocus}
        id={label}
        type={type}
        disabled={disabled}
        autoFocus={autoFocus}
        placeholder={placeholder}
        value={value}
        maxRows={maxRows}
        inputProps={{
          maxLength,
          style: {
            height: "127px",
          },
          readOnly,
        }}
        {...register}
      />
    </div>
  );
};
