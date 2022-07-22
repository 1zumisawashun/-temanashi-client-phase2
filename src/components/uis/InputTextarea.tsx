import { TextField } from '@mui/material'
import styled from '@emotion/styled'
import { UseFormRegisterReturn } from 'react-hook-form'
import { error } from 'console'

const StyledTextField = styled(TextField)`
  background-color: white;
  font-size: 16px;
  margin-top: 6px;
  width: 100%;
`

const SubText = styled('p')`
  color: #999;
  font-size: 0.75rem;
  font-weight: 400;
  letter-spacing: 0.03333em;
  line-height: 1.66;
  margin-bottom: 0;
  margin-left: 14px;
  margin-right: 14px;
  margin-top: 3px;
  text-align: left;
`

const StyledLabelText = styled('label')`
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 4px;
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
  subText?: string
}

export const InputTextarea: React.VFC<InputTextareaProps> = ({
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
  maxLength = 1000,
  maxRows = 50,
  readOnly,
  subText = '※これはテストこれはテストこれはテスト'
}) => {
  return (
    <div>
      {label && <StyledLabelText htmlFor={label}>{label}</StyledLabelText>}
      {subText && <SubText>{subText}</SubText>}
      <StyledTextField
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
            height: '127px'
          },
          readOnly
        }}
        {...register}
      />
    </div>
  )
}
