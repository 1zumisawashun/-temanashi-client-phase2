import { TextField } from '@mui/material'
import styled from '@emotion/styled'
import { UseFormRegisterReturn } from 'react-hook-form'

const Wrapper = styled('div')`
  background-color: transparent;
  color: #84bcb4;
  font-weight: bold;
  margin: 20px;
`

const Label = styled('label')`
  font-size: 16px;
  margin: auto 0;
  width: 20%;
`

const CustomTextField = styled(TextField)`
  margin: 20px auto;
  width: 100%;
`

export interface InputTextareaProps {
  // NOTE:アクション
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void
  onKeyDown?: (event: React.KeyboardEvent<HTMLTextAreaElement>) => void
  onBlur?: (event: React.FocusEvent<HTMLTextAreaElement>) => void
  onFocus?: (event: React.FocusEvent<HTMLTextAreaElement>) => void
  // NOTE:エラーハンドリング
  register?: UseFormRegisterReturn
  error?: boolean
  helperText?: string
  // NOTE:必須項目
  label?: string
  value?: string
  disabled?: boolean
  placeholder?: string
  type?: 'text' | 'password' | 'email' | 'number' | 'tel' | 'url' | 'search'
  //NOTE:追加項目
  autoFocus?: boolean
  maxLength?: number
  maxRows?: number
  readOnly?: boolean
}

export const InputTextarea: React.VFC<InputTextareaProps> = ({
  onChange,
  onKeyDown,
  onBlur,
  onFocus,
  register,
  error = false,
  helperText,
  label,
  value,
  disabled = false,
  placeholder,
  type = 'text',
  autoFocus = false,
  maxLength = 1000,
  maxRows = 50,
  readOnly
}) => {
  return (
    <Wrapper>
      {label && <Label htmlFor={label}>{label}</Label>}
      <CustomTextField
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
        inputProps={{
          maxLength,
          style: {
            // height: "127px",
          },
          readOnly
        }}
        {...register}
      />
    </Wrapper>
  )
}
