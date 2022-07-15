import { TextField } from '@mui/material'
import styled from '@emotion/styled'
import { UseFormRegisterReturn } from 'react-hook-form'

const Text = styled(TextField)`
  background-color: white;
  font-size: 16px;
  margin-top: 6px;
  width: 100%;
`

const Label = styled('label')`
  font-size: 12px;
  font-weight: bold;
  margin-bottom: 4px;
`

export interface InputTextProps {
  // NOTE:アクション
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void
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
  name?: string
  pattern?: string
  maxLength?: number
  inputRef?: React.RefObject<HTMLInputElement>
  size?: 'small'
}

export const InputText: React.VFC<InputTextProps> = ({
  onChange,
  onKeyDown,
  onBlur,
  onFocus,
  register,
  error = false,
  helperText = '',
  label,
  value,
  disabled = false,
  placeholder,
  type = 'text',
  autoFocus = false,
  name,
  pattern,
  maxLength = 255,
  inputRef = null,
  size
}) => {
  return (
    <div>
      {label && <Label htmlFor={label}>{label}</Label>}
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
        inputProps={{
          maxLength,
          pattern
        }}
        {...register}
      />
    </div>
  )
}
