import { useForm, SubmitHandler } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import styled from '@emotion/styled'
import { InputText, Button, ButtonLink, ErrorText } from '../uis'
import { useAuth, mediaQuery } from '../../functions/hooks'

export const AuthContainer = styled('div')`
  background: linear-gradient(to right, #84bcb4, #84bcb4, #84bcb4);
  height: 100vh;
  margin: 0;
  position: relative;
`
export const AuthInner = styled('div')`
  left: 50%;
  position: absolute;
  top: 50%;
  transform: translateY(-50%) translateX(-50%);
  width: 30%;
  ${mediaQuery('sp')} {
    width: 80%;
  }
`
export const AuthFormContainer = styled('form')`
  backdrop-filter: blur(12px);
  background: rgba(255, 255, 255, 0.1);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  border-left: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 12px;
  border-right: 1px solid rgba(255, 255, 255, 0.3);
  border-top: 1px solid rgba(255, 255, 255, 0.5);
  box-shadow: 0 26px 42px rgba(0, 0, 0, 0.1);
  margin: auto;
  padding: 50px;
  ${mediaQuery('sp')} {
    padding: 30px;
  }
`
export const AuthTitle = styled('h1')`
  color: white;
  letter-spacing: 2px;
  margin-top: 0;
`

interface FormData {
  email: string
  password: string
}

export const LoginTemplate: React.VFC = () => {
  const { login, error, isPending } = useAuth()

  const getSchema = () => {
    return yup.object({
      email: yup.string().email('emailの形式で入力してください。'),
      password: yup.string().required('パスワードを入力してください。')
    })
  }

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    mode: 'onChange',
    resolver: yupResolver(getSchema())
  })

  const onSubmit: SubmitHandler<FormData> = (data) => {
    const { email, password } = data
    login(email, password)
  }

  return (
    <AuthContainer>
      <AuthInner>
        <AuthFormContainer data-cy="login">
          <AuthTitle>login</AuthTitle>
          <InputText
            size="small"
            register={register('email')}
            error={'email' in errors}
            helperText={errors.email?.message}
            placeholder="xyz@gmail.com"
            data-cy="email"
          />
          <InputText
            size="small"
            register={register('password')}
            error={'password' in errors}
            helperText={errors.password?.message}
            placeholder="Must have atleast 6 characters"
            data-cy="password"
          />
          <Button
            isLoading={isPending}
            data-cy="login"
            size="large"
            fullWidth
            onClick={handleSubmit(onSubmit)}
          >
            Login
          </Button>
          <ErrorText error={error} helperText={error} />
          <ButtonLink path="/signup">Move To Sign Up</ButtonLink>
        </AuthFormContainer>
      </AuthInner>
    </AuthContainer>
  )
}
