import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useForm, SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  InputText,
  Button,
  ButtonLink,
  InputFileSingle,
  ErrorText,
} from "../ui";
import styled from "@emotion/styled";

const Container = styled("div")`
  background: linear-gradient(to right, #84bcb4, #84bcb4, #84bcb4);
  height: 100vh;
  margin: 0;
  position: relative;
`;
const Inner = styled("div")`
  left: 50%;
  position: absolute;
  top: 50%;
  transform: translateY(-50%) translateX(-50%);
  width: 30%;
`;
const FormContainer = styled("form")`
  backdrop-filter: blur(12px);
  background: rgba(255, 255, 255, 0.1);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  border-left: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 12px;
  border-right: 1px solid rgba(255, 255, 255, 0.3);
  border-top: 1px solid rgba(255, 255, 255, 0.5);
  box-shadow: 0 26px 42px rgba(0, 0, 0, 0.1);
  font-family: "Montserrat", sans-serif;
  margin: auto;
  padding: 50px;
`;
const Title = styled("h1")`
  color: white;
  font-family: "Poppins", sans-serif;
  letter-spacing: 2px;
  margin-top: 0;
`;
interface FormData {
  email: string;
  password: string;
  displayName: string;
  thumbnail: File | null;
}

export const SignupTemplate: React.VFC = () => {
  const { signup, isPending, error } = useAuth();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [displayName, setDisplayName] = useState<string>("");
  const [thumbnail, setThumbnail] = useState<File | null>(null);

  const getSchema = () => {
    return yup.object({
      email: yup.string().email("emailの形式で入力してください。"),
      password: yup.string().required("パスワードを入力してください。"),
      displayName: yup.string().required("名前を入力してください。"),
    });
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    mode: "onChange",
    resolver: yupResolver(getSchema()),
  });

  const onSubmit = () => {
    if (thumbnail === null) return;
    signup(email, password, displayName, thumbnail);
  };

  const onPreSubmit: SubmitHandler<FormData> = () => {
    onSubmit();
  };

  const onInputFileChange = (file: File) => {
    setThumbnail(file);
  };

  return (
    <Container>
      <Inner>
        <FormContainer>
          <Title>Sign Up</Title>
          <InputText
            size="small"
            register={register("email", {
              onChange: (e) => setEmail(e.target.value),
            })}
            error={"email" in errors}
            helperText={errors.email?.message}
            placeholder="xyz@gmail.com"
          />
          <InputText
            size="small"
            register={register("password", {
              onChange: (e) => setPassword(e.target.value),
            })}
            error={"password" in errors}
            helperText={errors.password?.message}
            placeholder="Must have atleast 6 characters"
          />
          <InputText
            size="small"
            register={register("displayName", {
              onChange: (e) => setDisplayName(e.target.value),
            })}
            error={"displayName" in errors}
            helperText={errors.displayName?.message}
            placeholder="your name or nick name"
          />
          <InputFileSingle
            thumbnail={thumbnail}
            onInputFileChange={onInputFileChange}
          />
          <Button
            isLoading={isPending}
            size="large"
            fullWidth
            onClick={() => {
              handleSubmit(onPreSubmit)();
            }}
          >
            Sign Up
          </Button>
          <ErrorText error={error} helperText={error} />
          <ButtonLink path="/login">Move To Login</ButtonLink>
        </FormContainer>
      </Inner>
    </Container>
  );
};
