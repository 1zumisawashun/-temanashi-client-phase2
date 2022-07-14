import { TextField, InputAdornment, IconButton } from '@mui/material'
import styled from '@emotion/styled'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import { UseFormRegisterReturn } from 'react-hook-form'

const Wrapper = styled('div')`
  background-color: transparent;
  display: flex;
  color: #84bcb4;
  margin: 20px;
  font-weight: bold;
`

const Label = styled('label')`
  width: 20%;
  margin: auto 0;
  font-size: 16px;
`

const CustomTextField = styled(TextField)`
  width: 80%;
  .MuiOutlinedInput-root {
    padding: 0;
    /* fieldset {
      border: none;
    }
    &:hover fieldset {
      border: none;
    }
    &.Mui-focused fieldset {
      border: none;
    } */
  }
`

const CustomInputAdornment = styled(InputAdornment)`
  position: absolute;
  padding: 0;
  right: 10px;
  top: 50%;
`

export type InputTextProps = {
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
  label = '店舗名（30文字）',
  value,
  disabled = false,
  placeholder,
  type = 'text',
  autoFocus = false,
  name,
  // pattern,
  // maxLength = 255,
  inputRef = null,
  size
}) => {
  return (
    <Wrapper>
      <Label htmlFor={label}>{label}</Label>
      <CustomTextField
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
        // maxLength,
        // pattern,
        InputProps={{
          endAdornment: (
            <CustomInputAdornment position="end">
              <IconButton>
                <ArrowForwardIosIcon />
              </IconButton>
            </CustomInputAdornment>
          )
        }}
        {...register}
      />
    </Wrapper>
  )
}
