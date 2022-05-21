import { FC, FormEvent } from "react";
import { projectFunctions, isEmulating } from "../../../firebase/config";
import { useAuthContext } from "../../../hooks/useAuthContext";
import { useCookies } from "react-cookie";
import { useAuth } from "../../../hooks/useAuth";
import { useHistory } from "react-router-dom";
import axios from "../../../utilities/axiosClient";

type Response = {
  message: string;
  jwt: string;
};

const UserAccount: FC = () => {
  const { user } = useAuthContext();
  if (!user) throw new Error("we cant find your account");
  const [cookies, setCookie] = useCookies(["jwt"]);
  const { logout, isPending } = useAuth();
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
    setCookie("jwt", result.data.jwt, { path: "/" });
    console.log(result, "result");
  };

  // NOTE:検証済み_20220515
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

  // NOTE:検証済み_20220515
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
    <>
      <div className="user-container">
        <div className="inner">
          <button onClick={onCallTest} className="btn">
            OnCallTest
          </button>
          <button onClick={onRequestTest} className="btn">
            OnRequestTest
          </button>
          <button onClick={getAxiosTest} className="btn">
            GetAxiosTest
          </button>
          <button onClick={createJWT} className="btn">
            CreateJWT
          </button>
          <button onClick={verifyJWT} className="btn">
            verifyJWT
          </button>
          {isEmulating && (
            <button onClick={Emulating} className="btn">
              emulatingTest
            </button>
          )}
          {!isEmulating && (
            <button onClick={Emulating} className="btn -disabled" disabled>
              not work emulating test...
            </button>
          )}

          {!isPending && (
            <button onClick={handleSubmit} className="btn">
              Logout
            </button>
          )}
          {isPending && (
            <button onClick={handleSubmit} className="btn -disabled" disabled>
              Logging out...
            </button>
          )}
        </div>
      </div>
    </>
  );
};
export default UserAccount;
