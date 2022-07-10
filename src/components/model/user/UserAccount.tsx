import { FormEvent, useState } from "react";
import { projectFunctions, isEmulating } from "../../../firebase/config";
import { useAuthContext, useToken, useAuth } from "../../../hooks";
import { useHistory } from "react-router-dom";
import axios from "../../../utilities/axiosClient";
import { SwitchForm, BasicButton, SelectForm, InputTextCustom } from "../../ui";
import styled from "@emotion/styled";
import MuiDivider from "@mui/material/Divider";

const UserContaienr = styled("div")`
  width: 100%;
  min-height: 300px;
  background: #f4f4f4;
`;
const FormContaienr = styled("div")`
  border: 1px solid rgba(0, 0, 0, 0.12);
`;

type Response = {
  message: string;
  jwt: string;
};

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

const UserAccount: React.VFC = () => {
  const { user } = useAuthContext();
  if (!user) throw new Error("we cant find your account");
  const { logout, isPending } = useAuth();
  const { setJWT } = useToken();
  const history = useHistory();
  const [checked, setChecked] = useState<boolean>(false);
  const [selectValue, setSelectValue] = useState("");
  const [textValue, setTextValue] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    logout();
    history.push("/login");
  };

  const onCallTest = () => {
    const helloOnCall = projectFunctions.httpsCallable("helloOnCall");
    helloOnCall({ name: `shun` }).then((result) => {
      console.log(result.data);
    });
  };
  const onRequestTest = async () => {
    const result = await axios.get(`/helloOnRequest`);
    console.log(result, "result");
  };
  const getAxiosTest = async () => {
    const result = await axios.get(`/api/hello`);
    console.log(result, "result");
  };
  const createJWT = async () => {
    const params = {
      uid: user.uid,
      name: user.displayName,
    };
    const result = await axios.post<Response>(`/api/jwt`, params);
    setJWT(result.data.jwt);
    console.log(result, "result");
  };
  const verifyJWT = async () => {
    const path = `/api/jwt/check`;
    const result = await axios.get(path).catch((err) => {
      return err.response;
    });
    if (result.status !== 200) {
      history.push("/error");
    }
    console.log(result, "check JWT");
  };
  const Emulating = async () => {
    const path = `/api/hello`;
    const result = await axios.get(path).catch((err) => {
      return err.response;
    });
    if (result.status !== 200) {
      history.push("/error");
    }
    console.log(result, "check Emulator");
  };
  const handleSwitchForm = (e: any) => {
    setChecked((prev) => !prev);
  };
  const handleSelectForm = (e: any) => {
    setSelectValue(e.target.value);
  };
  const onInputChange = (e: any) => {
    setTextValue(e.target.value);
  };

  return (
    <UserContaienr>
      <BasicButton onClick={onCallTest}>OnCallTest</BasicButton>
      <BasicButton onClick={onRequestTest}>OnRequestTest</BasicButton>
      <BasicButton onClick={getAxiosTest}>GetAxiosTest</BasicButton>
      <BasicButton onClick={createJWT}>CreateJWT</BasicButton>
      <BasicButton onClick={verifyJWT}>verifyJWT</BasicButton>
      <BasicButton onClick={Emulating} isDisabled={isEmulating}>
        emulatingTest
      </BasicButton>
      <BasicButton onClick={handleSubmit} isDisabled={isPending}>
        Logout
      </BasicButton>
      <FormContaienr>
        <SwitchForm onChange={handleSwitchForm} value={checked} />
        <MuiDivider />
        <SelectForm
          options={selectOptions}
          value={selectValue}
          onChange={handleSelectForm}
        />
        <MuiDivider />
        <InputTextCustom value={textValue} onChange={onInputChange} />
      </FormContaienr>
    </UserContaienr>
  );
};
export default UserAccount;
