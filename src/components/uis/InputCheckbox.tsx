import { Checkbox, FormControlLabel } from '@mui/material'
import styled from '@emotion/styled'
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace'
import CheckBoxIcon from '@mui/icons-material/CheckBox'
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank'

export interface CheckBoxProps {
  label?: string | ReactJSXElement
  disabled?: boolean
  checked: boolean
  size?: 'small' | 'medium'
  color?:
    | 'default'
    | 'primary'
    | 'secondary'
    | 'error'
    | 'info'
    | 'success'
    | 'warning'
  value: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  icon?: JSX.Element
  checkedIcon?: JSX.Element
}
export interface IconPeops {
  content: string
  size?: 'small' | 'medium' | 'large'
}
const CustomSpan = styled('span')<{
  size?: string
}>`
  align-items: center;
  display: flex;
  height: ${(p) => {
    if (p.size === 'small') return 30
    if (p.size === 'medium') return 40
    if (p.size === 'large') return 50
    return 0
  }}px;
  justify-content: center;
`
const CustomP = styled('p')<{
  size?: string
  shape?: string
  isChecked?: boolean
}>`
  background-color: ${(p) => (p.isChecked ? '#84bcb4' : 'gray')};
  border-radius: ${(p) => {
    if (p.shape === 'square') return 10
    return 0
  }}%;
  color: white;
  display: inline-block;
  font-size: 15px;
  height: ${(p) => {
    if (p.size === 'small') return 30
    if (p.size === 'medium') return 40
    if (p.size === 'large') return 50
    return 0
  }}px;
  width: ${(p) => {
    if (p.size === 'small') return 30
    if (p.size === 'medium') return 40
    if (p.size === 'large') return 50
    return 0
  }}px;
`

const StyledCheckBox = styled(Checkbox)`
  padding: 0 20px;
`

export const SquareIcon: React.VFC<IconPeops> = ({
  content,
  size = 'medium'
}) => (
  <CustomP size={size} shape="square" isChecked>
    <CustomSpan size={size}>{content}</CustomSpan>
  </CustomP>
)
export const SquareIconBlank: React.VFC<IconPeops> = ({
  content,
  size = 'medium'
}) => (
  <CustomP size={size} shape="square">
    <CustomSpan size={size}>{content}</CustomSpan>
  </CustomP>
)

/**
 * phase3の実装を先んじて取り入れている
 * 基本的にはphase3の実装と同じになっている
 */
export const InputCheckbox: React.VFC<CheckBoxProps> = ({
  label = '',
  checked = false,
  disabled = false,
  size = 'small',
  color = 'primary',
  value = '',
  onChange,
  icon = <CheckBoxIcon />,
  checkedIcon = <CheckBoxOutlineBlankIcon />
}) => {
  return (
    <FormControlLabel
      control={
        <StyledCheckBox
          onChange={onChange}
          checked={checked}
          disabled={disabled}
          size={size}
          color={color}
          value={value}
          icon={icon}
          checkedIcon={checkedIcon}
        />
      }
      label={label}
      labelPlacement="end"
    />
  )
}
