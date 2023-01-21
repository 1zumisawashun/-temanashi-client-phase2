import { useState } from 'react'
import styled from '@emotion/styled'
import {
  Button,
  Divider,
  Modal,
  CircleDotSpiner,
  RevolvingDotSpiner
} from '../components/uis'
import {
  SquareIcon,
  SquareIconBlank,
  CircleIcon,
  CircleIconBlank
} from '../components/uis/phase3/CheckboxGroup'
import {
  SwitchForm,
  SelectForm,
  InputText,
  InputTextarea,
  CheckboxGroup,
  LinkCardNormal,
  LinkCardNormalWithoutBackground,
  LinkCardFlex,
  LinkCardFlexWithoutBackground,
  Datetimepicker
} from '../components/uis/phase3'
import {
  categoryOptions,
  weekdaysOptions
} from '../functions/utilities/constant'

const Container = styled('div')`
  background: #f4f4f4;
  min-height: 300px;
  width: 100%;
`
const Inner = styled('div')`
  margin: auto;
  width: 60%;
`
const FormContainer = styled('div')`
  border: 1px solid rgba(0, 0, 0, 0.12);
  padding-bottom: 40px;
`
const ButtonWrapper = styled('div')`
  margin: 0 20px 20px;
  text-align: end;
`
const CoutionText = styled('div')`
  color: red;
  font-size: 14px;
  margin: 0 20px 20px;
`
const ExampleText = styled('div')`
  font-size: 14px;
  margin: 0 20px 20px;
`
const ComponentContainer = styled('div')`
  border: 1px solid black;
  border-radius: 4px;
  margin-top: 40px;
  padding: 16px;
  padding-bottom: 8px;
  position: relative;
`
const ComponentFlex = styled('div')`
  display: flex;
  gap: 10px;
`
const ComponentTitle = styled('p')`
  background-color: #f4f4f4;
  font-size: 20px;
  font-weight: bold;
  left: 16px;
  padding: 0 8px;
  position: absolute;
  top: -16px;
`
const CheckboxGroupWrapper = styled('div')`
  background-color: transparent;
  color: #84bcb4;
  display: flex;
  font-weight: bold;
  margin: 20px;
`
const CheckboxGroupInner = styled('div')`
  display: flex;
  justify-content: end;
  width: 80%;
`
const Label = styled('label')`
  font-size: 16px;
  margin: auto 0;
  width: 20%;
`

export const Component: React.VFC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [checkedWithText, setCheckedWithText] = useState<boolean>(false)
  const [selectValue, setSelectValue] = useState('')
  const [textValue, setTextValue] = useState('')
  const [textareaValue, setTextareaValue] = useState('')
  const [textWithButtonValue, setTextWithButtonValue] = useState('')
  const [selectedCheckbox, setSelectedCheckbox] = useState<string[]>([])
  const [isSwitch, setIsSwitch] = useState<boolean>(false)
  const [isMatching, setIsMatching] = useState<boolean>(false)
  const [isAuto, setIsAuto] = useState<boolean>(false)
  const [datetimepicker, setDatetimepicker] = useState<Date | null>(new Date())

  const handleSwitchForm = (state: string) => {
    if (state === 'isSwitch') setIsSwitch((prev) => !prev)
    if (state === 'isMatching') setIsMatching((prev) => !prev)
    if (state === 'isAuto') setIsAuto((prev) => !prev)
  }
  const handleSwitchForm2 = () => {
    setCheckedWithText((prev) => !prev)
  }
  const handleSelectForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectValue(e.target.value)
  }
  const onInputText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTextValue(e.target.value)
  }
  const onInputText2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTextWithButtonValue(e.target.value)
  }
  const onInputTextarea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextareaValue(e.target.value)
  }
  const handleClick = () => {
    alert('handleClick')
  }
  const handleOpen = () => {
    setIsOpen((prev) => !prev)
  }

  const handleCheckboxGroup = (e: React.ChangeEvent<HTMLInputElement>) => {
    // checkされた場合
    if (e.target.checked) {
      const newSelectedCheckLists = [...selectedCheckbox, e.target.value]
      setSelectedCheckbox(newSelectedCheckLists)
      return
    }
    // checkが解除された場合
    const newSelectedCheckLists = selectedCheckbox.filter(
      (value) => value !== e.target.value
    )
    setSelectedCheckbox(newSelectedCheckLists)
  }

  const onChangeStartDate = (date: Date | null) => {
    if (!date) return
    setDatetimepicker(date)
  }

  return (
    <Container>
      <Inner>
        <FormContainer>
          <ComponentContainer>
            <ComponentTitle>Card</ComponentTitle>
            <LinkCardNormal />
            <Divider />
            <LinkCardNormalWithoutBackground />
            <Divider />
            <LinkCardFlex />
            <Divider />
            <LinkCardFlexWithoutBackground />
          </ComponentContainer>

          <ComponentContainer>
            <ComponentTitle>Datetimepicker</ComponentTitle>
            <Datetimepicker
              label="配信開始日"
              minDate={new Date()}
              minTime={new Date(0, 0, 0, 9)}
              maxTime={new Date(0, 0, 0, 19)}
              value={datetimepicker}
              onChange={onChangeStartDate}
            />
          </ComponentContainer>

          <ComponentContainer>
            <ComponentTitle>SwitchForm</ComponentTitle>
            <SwitchForm
              value={isSwitch}
              onChange={() => handleSwitchForm('isSwitch')}
            />
          </ComponentContainer>

          <ComponentContainer>
            <ComponentTitle>SelectForm</ComponentTitle>
            <SelectForm
              options={categoryOptions}
              value={selectValue}
              onChange={handleSelectForm}
            />
            <Divider />
            <SelectForm
              options={categoryOptions}
              value={selectValue}
              onChange={handleSelectForm}
              error
              helperText="errorerrorerrorerrorerror"
            />
            <Divider />
            <SelectForm
              options={categoryOptions}
              value={selectValue}
              onChange={handleSelectForm}
              isLoading
            />
          </ComponentContainer>

          <ComponentContainer>
            <ComponentTitle>InputText</ComponentTitle>
            <InputText value={textValue} onChange={onInputText} />
            <Divider />
            <InputText
              value={textValue}
              onChange={onInputText}
              error
              helperText="errorerrorerrorerrorerror"
            />
          </ComponentContainer>

          <ComponentContainer>
            <ComponentTitle>InputTextarea</ComponentTitle>
            <InputTextarea
              label="備考欄（200文字）"
              value={textareaValue}
              onChange={onInputTextarea}
            />
            <Divider />
            <InputTextarea
              label="備考欄（200文字）"
              value={textareaValue}
              onChange={onInputTextarea}
              error
              helperText="errorerrorerrorerrorerror"
            />
          </ComponentContainer>

          <ComponentContainer>
            <ComponentTitle>InputText + Button</ComponentTitle>
            <InputText value={textWithButtonValue} onChange={onInputText2} />
            <ButtonWrapper>
              <Button onClick={handleClick}>地図から反映</Button>
            </ButtonWrapper>
            <CoutionText>
              ※初期設定では「東京駅前」に設定されてしまいます。必ず店舗の位置を変更してください。
            </CoutionText>
          </ComponentContainer>

          <ComponentContainer>
            <ComponentTitle>SwitchForm + InputTextarea</ComponentTitle>
            <SwitchForm onChange={handleSwitchForm2} value={checkedWithText} />
            <CoutionText>
              ※アクセスの際の注意点があればご記入ください。利用者側にのみ通知されます。
            </CoutionText>
            {checkedWithText && (
              <>
                <ExampleText>
                  例：店舗は １階ですが、地下１階が受付になります。
                </ExampleText>
                <InputTextarea
                  value={textareaValue}
                  onChange={onInputTextarea}
                />
              </>
            )}
          </ComponentContainer>

          <ComponentContainer>
            <ComponentTitle>Spiner</ComponentTitle>
            <ComponentFlex>
              <CircleDotSpiner />
              <RevolvingDotSpiner />
            </ComponentFlex>
          </ComponentContainer>

          <ComponentContainer>
            <ComponentTitle>Button & BasicModal</ComponentTitle>
            <Button onClick={handleOpen}>primary</Button>
            <Divider />
            <Button onClick={handleOpen} isLoading>
              primary
            </Button>
            <Divider />
            <Button onClick={handleOpen} variant="secondary">
              secondary
            </Button>
            <Divider />
            <Button onClick={handleOpen} isDisabled>
              disable
            </Button>
            <Modal
              title="modal"
              open={isOpen}
              handleOpen={handleOpen}
              contents={<InputTextarea />}
              footer={
                <>
                  <Button onClick={handleOpen}>はい</Button>
                  <Button onClick={handleOpen}>いいえ</Button>
                </>
              }
            />
          </ComponentContainer>

          <ComponentContainer>
            <ComponentTitle>CheckboxGroup</ComponentTitle>
            <CheckboxGroupWrapper>
              <Label>オープン</Label>
              <CheckboxGroupInner>
                <CheckboxGroup
                  value=""
                  label="マッチング"
                  checked={isMatching}
                  onChange={() => handleSwitchForm('isMatching')}
                  icon={<SquareIcon content="ON" />}
                  checkedIcon={<SquareIconBlank content="OFF" />}
                />
                <CheckboxGroup
                  value=""
                  label="オート"
                  checked={isAuto}
                  onChange={() => handleSwitchForm('isAuto')}
                  icon={<SquareIcon content="ON" />}
                  checkedIcon={<SquareIconBlank content="OFF" />}
                />
              </CheckboxGroupInner>
            </CheckboxGroupWrapper>
            <Divider />
            <CheckboxGroupWrapper>
              <Label>定休日</Label>
              <CheckboxGroupInner>
                {weekdaysOptions.map((weekday) => (
                  <CheckboxGroup
                    value={weekday}
                    checked={selectedCheckbox.includes(weekday)}
                    onChange={handleCheckboxGroup}
                    icon={<CircleIcon content={weekday} size="small" />}
                    checkedIcon={
                      <CircleIconBlank content={weekday} size="small" />
                    }
                  />
                ))}
              </CheckboxGroupInner>
            </CheckboxGroupWrapper>
          </ComponentContainer>
        </FormContainer>
      </Inner>
    </Container>
  )
}
