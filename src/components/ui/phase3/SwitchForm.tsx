import styled from '@emotion/styled'
import { Switch, FormControlLabel, styled as muiStyled } from '@mui/material'

const SwitchContainer = styled('div')``

const Container = styled(FormControlLabel)`
  justify-content: space-between;
  display: flex;
  color: #84bcb4;
  margin: 0 0 0 20px;
  .MuiTypography-root {
    font-weight: bold;
  }
`

interface SwitchFormProps {
  label?: string
  checked?: boolean
  offLabel?: string
  onLabel?: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  disabled?: boolean
  value?: boolean
}

const CustomSwitch = muiStyled(Switch)(({ theme }) => ({
  width: 62, // width: 42,
  height: 26,
  padding: 0,
  '& .MuiSwitch-switchBase': {
    padding: 0,
    margin: 2,
    transitionDuration: '300ms',
    '&.Mui-checked': {
      transform: 'translateX(36px)', // transform: "translateX(16px)",
      color: '#fff',
      '& + .MuiSwitch-track': {
        // NOTE:checkedcolor
        backgroundColor: theme.palette.mode === 'dark' ? '#2ECA45' : '#84bcb4',
        opacity: 1,
        border: 0
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: 0.5
      }
    },
    '&.Mui-focusVisible .MuiSwitch-thumb': {
      color: '#33cf4d',
      border: '6px solid #fff'
    },
    '&.Mui-disabled .MuiSwitch-thumb': {
      color:
        theme.palette.mode === 'light'
          ? theme.palette.grey[100]
          : theme.palette.grey[600]
    },
    '&.Mui-disabled + .MuiSwitch-track': {
      opacity: theme.palette.mode === 'light' ? 0.7 : 0.3
    }
  },
  '& .MuiSwitch-thumb': {
    boxSizing: 'border-box',
    width: 22,
    height: 22
  },
  '& .MuiSwitch-track': {
    borderRadius: 26 / 2,
    // NOTE:uncheckedcolor
    backgroundColor: theme.palette.mode === 'light' ? '#818181' : '#39393D',
    opacity: 1,
    transition: theme.transitions.create(['background-color'], {
      duration: 500
    })
  }
}))

export const SwitchForm: React.VFC<SwitchFormProps> = ({
  label = '最低注文金額',
  checked,
  onChange,
  disabled = false,
  value
}) => {
  // m1以上で中央寄りになる＞mなし場合近すぎてラベルとスイッチの高さがずれて見える
  return (
    <SwitchContainer>
      <Container
        control={
          <CustomSwitch
            onChange={onChange}
            checked={checked}
            disabled={disabled}
            sx={{ m: 2 }}
          />
        }
        label={label}
        labelPlacement="start"
      />
    </SwitchContainer>
  )
}
