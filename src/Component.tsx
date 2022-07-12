import { FormEvent, useState } from "react";
import {
  SwitchForm,
  BasicButton,
  SelectForm,
  InputTextCustom,
  InputTextareaCustom,
} from "./components/ui";
import MuiDivider from "@mui/material/Divider";
import styled from "@emotion/styled";

const Container = styled("div")`
  width: 100%;
  min-height: 300px;
  background: #f4f4f4;
`;
const Inner = styled("div")`
  width: 50%;
  margin: auto;
`;
const FormContainer = styled("div")`
  border: 1px solid rgba(0, 0, 0, 0.12);
`;
const ButtonWrapper = styled("div")`
  text-align: end;
  margin: 0 20px 20px;
`;
const CoutionText = styled("div")`
  font-size: 12px;
  font-weight: bold;
  color: red;
  margin: 0 20px 20px;
`;
const ExampleText = styled("div")`
  font-size: 12px;
  font-weight: bold;
  margin: 0 20px 20px;
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

export const Component: React.VFC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [checked, setChecked] = useState<boolean>(false);
  const [checkedWithText, setCheckedWithText] = useState<boolean>(false);
  const [selectValue, setSelectValue] = useState("");
  const [textValue, setTextValue] = useState("");
  const [textareaValue, setTextareaValue] = useState("");
  const [textWithButtonValue, setTextWithButtonValue] = useState("");

  const handleSwitchForm = (e: any) => {
    setChecked((prev) => !prev);
  };
  const handleSwitchForm2 = (e: any) => {
    setCheckedWithText((prev) => !prev);
  };
  const handleSelectForm = (e: any) => {
    setSelectValue(e.target.value);
  };
  const onInputChange = (e: any) => {
    setTextValue(e.target.value);
  };
  const onInputChange2 = (e: any) => {
    setTextareaValue(e.target.value);
  };
  const onInputChange3 = (e: any) => {
    setTextWithButtonValue(e.target.value);
  };
  const handleClick = (e: any) => {
    console.log("handleClick");
  };
  const handleOpen = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <Container>
      <Inner>
        <FormContainer>
          <SwitchForm onChange={handleSwitchForm} value={checked} />
          <MuiDivider />

          <SelectForm
            options={selectOptions}
            value={selectValue}
            onChange={handleSelectForm}
          />
          <MuiDivider />

          <InputTextCustom value={textValue} onChange={onInputChange} />
          <MuiDivider />

          <InputTextareaCustom
            label="備考欄(200文字)"
            value={textareaValue}
            onChange={onInputChange2}
          />
          <MuiDivider />

          <InputTextCustom
            value={textWithButtonValue}
            onChange={onInputChange3}
          />
          <ButtonWrapper>
            <BasicButton onClick={handleClick}>地図から反映</BasicButton>
          </ButtonWrapper>
          <CoutionText>
            初期設定では「東京駅前」に設定されてしまいます。必ず店舗の位置を変更してください。
          </CoutionText>

          <MuiDivider />
          <SwitchForm onChange={handleSwitchForm2} value={checkedWithText} />
          <CoutionText>
            アクセスの際の注意点があればご記入ください。利用者側にのみ通知されます。
          </CoutionText>
          {checkedWithText && (
            <>
              <ExampleText>
                例：店舗は １階ですが、地下１階が受付になります。
              </ExampleText>
              <InputTextareaCustom
                value={textareaValue}
                onChange={onInputChange2}
              />
            </>
          )}
        </FormContainer>
      </Inner>
    </Container>
  );
};
