import { useState } from "react";
import { BasicButton, Divider, BasicModal } from "../components/ui";
import styled from "@emotion/styled";
import {
  SquareIcon,
  SquareIconBlank,
  CircleIcon,
  CircleIconBlank,
} from "../components/ui/phase3/CheckboxGroup";
import {
  SwitchForm,
  SelectForm,
  InputText,
  InputTextarea,
  CheckboxGroup,
} from "../components/ui/phase3";

const Container = styled("div")`
  width: 100%;
  min-height: 300px;
  background: #f4f4f4;
`;
const Inner = styled("div")`
  width: 60%;
  margin: auto;
`;
const FormContainer = styled("div")`
  border: 1px solid rgba(0, 0, 0, 0.12);
  padding-bottom: 40px;
`;
const ButtonWrapper = styled("div")`
  text-align: end;
  margin: 0 20px 20px;
`;
const CoutionText = styled("div")`
  font-size: 14px;
  color: red;
  margin: 0 20px 20px;
`;
const ExampleText = styled("div")`
  font-size: 14px;
  margin: 0 20px 20px;
`;

const ComponentContainer = styled("div")`
  position: relative;
  margin-top: 40px;
  padding: 16px;
  padding-bottom: 8px;
  border: 1px solid black;
  border-radius: 4px;
`;

const ComponentTitle = styled("p")`
  position: absolute;
  top: -16px;
  left: 16px;
  padding: 0 8px;
  font-size: 20px;
  font-weight: bold;
  background-color: #f4f4f4;
`;

const CheckboxGroupWrapper = styled("div")`
  background-color: transparent;
  display: flex;
  color: #84bcb4;
  margin: 20px;
  font-weight: bold;
`;
const CheckboxGroupInner = styled("div")`
  width: 80%;
  text-align: end;
`;

const Label = styled("label")`
  width: 20%;
  margin: auto 0;
  font-size: 16px;
`;

export type OptionProps = {
  value: string;
  label: string;
};

const selectOptions: OptionProps[] = [
  {
    value: "0",
    label: "神奈川県",
  },
  {
    value: "1",
    label: "東京都",
  },
  {
    value: "2",
    label: "埼玉県",
  },
];
const weekdays = ["月", "火", "水", "木", "金", "土", "日"];

export const Component: React.VFC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [checkedWithText, setCheckedWithText] = useState<boolean>(false);
  const [selectValue, setSelectValue] = useState("");
  const [textValue, setTextValue] = useState("");
  const [textareaValue, setTextareaValue] = useState("");
  const [textWithButtonValue, setTextWithButtonValue] = useState("");
  const [selectedCheckbox, setSelectedCheckbox] = useState<string[]>([]);
  const [isSwitch, setIsSwitch] = useState<boolean>(false);
  const [isMatching, setIsMatching] = useState<boolean>(false);
  const [isAuto, setIsAuto] = useState<boolean>(false);

  const handleSwitchForm = (state: string) => {
    if (state === "isSwitch") setIsSwitch((prev) => !prev);
    if (state === "isMatching") setIsMatching((prev) => !prev);
    if (state === "isAuto") setIsAuto((prev) => !prev);
  };
  const handleSwitchForm2 = () => {
    setCheckedWithText((prev) => !prev);
  };
  const handleSelectForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectValue(e.target.value);
  };
  const onInputText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTextValue(e.target.value);
  };
  const onInputText2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTextWithButtonValue(e.target.value);
  };
  const onInputTextarea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextareaValue(e.target.value);
  };
  const handleClick = () => {
    alert("handleClick");
  };
  const handleOpen = () => {
    setIsOpen((prev) => !prev);
  };

  const handleCheckboxGroup = (e: React.ChangeEvent<HTMLInputElement>) => {
    // checkされた場合
    if (e.target.checked) {
      const newSelectedCheckLists = [...selectedCheckbox, e.target.value];
      setSelectedCheckbox(newSelectedCheckLists);
      return;
    }
    // checkが解除された場合
    const newSelectedCheckLists = selectedCheckbox.filter(
      (value) => value !== e.target.value
    );
    setSelectedCheckbox(newSelectedCheckLists);
  };

  return (
    <Container>
      <Inner>
        <FormContainer>
          <ComponentContainer>
            <ComponentTitle>SwitchForm</ComponentTitle>
            <SwitchForm
              value={isSwitch}
              onChange={() => handleSwitchForm("isSwitch")}
            />
          </ComponentContainer>

          <ComponentContainer>
            <ComponentTitle>SelectForm</ComponentTitle>
            <SelectForm
              options={selectOptions}
              value={selectValue}
              onChange={handleSelectForm}
            />
            <Divider />
            <SelectForm
              options={selectOptions}
              value={selectValue}
              onChange={handleSelectForm}
              error
              helperText="errorerrorerrorerrorerror"
            />
            <Divider />
            <SelectForm
              options={selectOptions}
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
            <ComponentTitle>InputText + BasicButton</ComponentTitle>
            <InputText value={textWithButtonValue} onChange={onInputText2} />
            <ButtonWrapper>
              <BasicButton onClick={handleClick}>地図から反映</BasicButton>
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
            <ComponentTitle>BasicButton & BasicModal</ComponentTitle>
            <BasicButton onClick={handleOpen}>primary</BasicButton>
            <Divider />
            <BasicButton onClick={handleOpen} isLoading>
              primary
            </BasicButton>
            <Divider />
            <BasicButton onClick={handleOpen} variant="secondary">
              secondary
            </BasicButton>
            <Divider />
            <BasicButton onClick={handleOpen} isDisabled>
              disable
            </BasicButton>
            <BasicModal
              title="basicmodal"
              open={isOpen}
              handleOpen={handleOpen}
              contents={<InputTextarea />}
              footer={
                <>
                  <BasicButton onClick={handleOpen}>はい</BasicButton>
                  <BasicButton onClick={handleOpen}>いいえ</BasicButton>
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
                  value={""}
                  label="マッチング"
                  checked={isMatching}
                  onChange={() => handleSwitchForm("isMatching")}
                  icon={<SquareIcon content="ON" />}
                  checkedIcon={<SquareIconBlank content="OFF" />}
                />
                <CheckboxGroup
                  value={""}
                  label="オート"
                  checked={isAuto}
                  onChange={() => handleSwitchForm("isAuto")}
                  icon={<SquareIcon content="ON" />}
                  checkedIcon={<SquareIconBlank content="OFF" />}
                />
              </CheckboxGroupInner>
            </CheckboxGroupWrapper>
            <Divider />
            <CheckboxGroupWrapper>
              <Label>定休日</Label>
              <CheckboxGroupInner>
                {weekdays.map((weekday) => (
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
  );
};
