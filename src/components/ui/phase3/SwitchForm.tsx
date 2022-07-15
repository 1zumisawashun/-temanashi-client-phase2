import styled from '@emotion/styled'
import { Switch, FormControlLabel, styled as muiStyled } from '@mui/material'

const SwitchContainer = styled('div')`
  display: block;
`

const Container = styled(FormControlLabel)`
  color: #84bcb4;
  display: flex;
  justify-content: space-between;
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
  /* stylelint-disable */
  width: 62, // width: 42,
  height: 26,
  padding: 0,
  '& .MuiSwitch-switchBase': {
    margin: 2,
    padding: 0,
    transitionDuration: '300ms',
    '&.Mui-checked': {
      color: '#fff',
      transform: 'translateX(36px)', // transform: "translateX(16px)",
      '& + .MuiSwitch-track': {
        // NOTE:checkedcolor
        backgroundColor: theme.palette.mode === 'dark' ? '#2ECA45' : '#84bcb4',
        border: 0,
        opacity: 1
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: 0.5
      }
    },
    '&.Mui-focusVisible .MuiSwitch-thumb': {
      border: '6px solid #fff',
      color: '#33cf4d'
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
    height: 22,
    width: 22
  },
  '& .MuiSwitch-track': {
    // NOTE:uncheckedcolor
    backgroundColor: theme.palette.mode === 'light' ? '#818181' : '#39393D',
    borderRadius: 26 / 2,
    opacity: 1,
    transition: theme.transitions.create(['background-color'], {
      duration: 500
    })
  }
  /* stylelint-enable */
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
