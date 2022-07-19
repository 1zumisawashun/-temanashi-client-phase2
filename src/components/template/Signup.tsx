import { useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import {
  InputText,
  Button,
  ButtonLink,
  InputFileSingle,
  ErrorText
} from '../ui'
import { useAuth } from '../../hooks/useAuth'
import { AuthContainer, AuthFormContainer, AuthInner, AuthTitle } from './Login'

interface FormData {
  email: string
  password: string
  displayName: string
  thumbnail: File | null
}

export const SignupTemplate: React.VFC = () => {
  const { signup, isPending, error } = useAuth()

  const [thumbnail, setThumbnail] = useState<File | null>(null)

  const getSchema = () => {
    return yup.object({
      email: yup.string().email('emailの形式で入力してください。'),
      password: yup.string().required('パスワードを入力してください。'),
      displayName: yup.string().required('名前を入力してください。')
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

  const onSubmit = (data: FormData) => {
    if (thumbnail === null) return
    const { email, password, displayName } = data
    signup(email, password, displayName, thumbnail)
  }

  const onPreSubmit: SubmitHandler<FormData> = (data: FormData) => {
    onSubmit(data)
  }

  const onInputFileChange = (file: File) => {
    setThumbnail(file)
  }

  return (
    <AuthContainer>
      <AuthInner>
        <AuthFormContainer>
          <AuthTitle>Sign Up</AuthTitle>
          <InputText
            size="small"
            register={register('email')}
            error={'email' in errors}
            helperText={errors.email?.message}
            placeholder="xyz@gmail.com"
          />
          <InputText
            size="small"
            register={register('password')}
            error={'password' in errors}
            helperText={errors.password?.message}
            placeholder="Must have atleast 6 characters"
          />
          <InputText
            size="small"
            register={register('displayName')}
            error={'displayName' in errors}
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
              handleSubmit(onPreSubmit)()
            }}
          >
            Sign Up
          </Button>
          <ErrorText error={error} helperText={error} />
          <ButtonLink path="/login">Move To Login</ButtonLink>
        </AuthFormContainer>
      </AuthInner>
    </AuthContainer>
  )
}
