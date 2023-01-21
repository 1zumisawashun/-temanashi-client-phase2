import FormControl from '@mui/material/FormControl'
import styled from '@emotion/styled'
import Select, { MultiValue } from 'react-select'
import { CSSProperties } from 'react'
import { ErrorText } from './index'
import { OptionProps } from '../../functions/types/Common'

const StyledFormControl = styled(FormControl)`
  font-size: 16px;
  margin-top: 6px;
  width: 100%;
`

const StyledLabel = styled('label')`
  font-size: 12px;
  font-weight: bold;
  margin-bottom: 4px;
`

// https://react-select.com/styles#style-object
const customStyles = (error = false) => {
  return {
    control: (provided: CSSProperties) => ({
      ...provided,
      color: '#84bcb4',
      height: '56px',
      marginTop: '6px',
      borderColor: error ? '#d32f2f' : '#999'
    })
  }
}

export type SelectFormProps = {
  label?: string
  onChange: (event: MultiValue<OptionProps>) => void
  options: OptionProps[]
  placeholder?: string
  disabled?: boolean
  isLoading?: boolean
  error?: boolean
  helperText?: string
}

export const InputSelect: React.VFC<SelectFormProps> = ({
  label,
  onChange,
  options,
  placeholder = 'カテゴリーを選択してください。',
  disabled = false,
  isLoading = false,
  error = false,
  helperText
}) => {
  return (
    <StyledFormControl>
      {label && <StyledLabel htmlFor={label}>{label}</StyledLabel>}
      <Select
        id={label}
        placeholder={placeholder}
        options={options}
        onChange={onChange}
        isMulti
        isDisabled={disabled}
        isLoading={isLoading}
        styles={customStyles(error)}
      />
      <ErrorText error={error} helperText={helperText} />
    </StyledFormControl>
  )
}
