import styled from '@emotion/styled'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import { DateTimePicker, ClockPickerView } from '@mui/lab'
import { TextField } from '@mui/material'
import jaLocale from 'date-fns/locale/ja'
import type { UseFormRegisterReturn } from 'react-hook-form'

const StyledTextField = styled(TextField)`
  width: 100%;
`

const Label = styled('p')`
  font-size: 12px;
  font-weight: 600;
  margin-bottom: 4px;
`

const FieldContainer = styled('div')`
  position: relative;
  width: 100%;
`

// NOTE: TimePcikerのテキストフィールドをキーボードで入力できないようにしたいため
// このスタイルを当てている。TimePcikerのpropsで対応したかったが無理だった
// フォームの右端をクリックすると入力できてしまう問題点もある
const FieldBlock = styled('div')`
  background-color: red;
  height: 100%;
  opacity: 0;
  position: absolute;
  width: calc(100% - 32px);
  z-index: 1;
`

export type BasicDateTimePickerProps = {
  label?: string
  value: Date | null
  onChange: (date: Date | null) => void
  register?: UseFormRegisterReturn
  error?: boolean
  helperText?: string
  minDate?: Date
  maxDate?: Date
  minTime?: Date
  maxTime?: Date
  placeholder?: string
  shouldDisableDate?: (date: Date) => boolean
  shouldDisableTime?: (timeValue: number, clockType: ClockPickerView) => boolean
}

export const Datetimepicker: React.VFC<BasicDateTimePickerProps> = ({
  label,
  value,
  onChange,
  register,
  error,
  helperText,
  minDate,
  maxDate,
  minTime,
  maxTime,
  placeholder = '',
  shouldDisableDate,
  shouldDisableTime
}) => {
  return (
    <div>
      {label && <Label>{label}</Label>}
      {/* <LocalizationProvider dateAdapter={AdapterDateFns} locale={jaLocale}> */}
      <DateTimePicker
        ampm={false}
        value={value}
        onChange={onChange}
        minDate={minDate}
        maxDate={maxDate}
        minTime={minTime}
        maxTime={maxTime}
        shouldDisableDate={shouldDisableDate}
        shouldDisableTime={shouldDisableTime}
        renderInput={(params: any) => (
          <FieldContainer>
            <FieldBlock />
            <StyledTextField
              {...params}
              inputProps={{
                ...params.inputProps,
                placeholder,
                tabIndex: -1,
                disabled: true
              }}
              {...register}
              error={error}
              helperText={helperText}
            />
          </FieldContainer>
        )}
        mask="____/__/__ __:__"
      />
      {/* </LocalizationProvider> */}
    </div>
  )
}
