import { FormEvent } from "react";
import { projectFunctions, isEmulating } from "../../../firebase/config";
import { useAuthContext, useToken, useAuth } from "../../../hooks";
import { useHistory } from "react-router-dom";
import axios from "../../../utilities/axiosClient";
import { BasicButton } from "../../ui";
import styled from "@emotion/styled";

const UserContainer = styled("div")`
  width: 100%;
  min-height: 300px;
  background: #f4f4f4;
`;

type Response = {
  message: string;
  jwt: string;
};

const UserAccount: React.VFC = () => {
  const { user } = useAuthContext();
  if (!user) throw new Error("we cant find your account");
  const { logout, isPending } = useAuth();
  const { setJWT } = useToken();
  const history = useHistory();

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

  return (
    <UserContainer>
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
    </UserContainer>
  );
};
export default UserAccount;
