import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { MultiValue } from 'react-select'
import { useForm, SubmitHandler, SubmitErrorHandler } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import styled from '@emotion/styled'
import { useErrorHandler } from 'react-error-boundary'
import { OptionProps } from '../uis/InputSelect'
import {
  InputSelect,
  InputText,
  InputTextarea,
  InputFileMultiple,
  Button
} from '../uis'
import { categoryOptions } from '../../utilities/constant'
import { useStorage, useReactScroll, useAxios } from '../../hooks'

const FormContainer = styled('div')`
  display: grid;
  gap: 10px;
`

interface FormData {
  name: string
  description: string
  price: string
  width: string
  length: string
  height: string
  stock: string
}

export const CreateTemplate: React.VFC = () => {
  const history = useHistory()
  const handleError = useErrorHandler()
  const { getStorageUrl } = useStorage()
  const { axios } = useAxios()

  const scrollToPhotos = useReactScroll('photos')
  const scrollToName = useReactScroll('name')
  const scrollToDescription = useReactScroll('description')
  const scrollToPrice = useReactScroll('price')
  const scrollToStock = useReactScroll('stock')

  const getSchema = () => {
    return yup.object({
      name: yup.string().required('名前を入力してください。'),
      description: yup.string().required('説明を入力してください。'),
      price: yup.string().required('価格を入力してください。'),
      width: yup.string().required('幅を入力してください。'),
      length: yup.string().required('深さを入力してください。'),
      height: yup.string().required('高さを入力してください。'),
      stock: yup.string().required('在庫を入力してください。')
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

  const [formError, setFromError] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [files, setFiles] = useState<File[]>([])
  const [categories, setCategories] = useState<MultiValue<string>>([])

  const onInputChangeSelect = (option: MultiValue<OptionProps>) => {
    const multivalue = option.map((item) => item.value)
    setCategories(multivalue)
  }

  const onInputFileChange = (value: File[]) => {
    setFiles(value)
  }

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setIsLoading(true)
    setFromError('')

    const result = await getStorageUrl(files)

    if (!result) {
      setFromError('画像を処理できませんでした。')
      setIsLoading(false)
      return
    }

    if (categories.length === 0) {
      setFromError('カテゴリーを選択してください。')
      setIsLoading(false)
      return
    }

    // NOTE:selectで複数選択できるが全体の型は修正していないので一旦一個のみポストする
    const product = {
      ...data,
      photos: result,
      category: categories[0]
    }

    try {
      await axios.post('/api/stripe-post', product)
      setIsLoading(false)
      history.push('/')
    } catch (error) {
      handleError('onSubmit Error')
      setIsLoading(false)
    }
  }

  const onError: SubmitErrorHandler<FormData> = (errors) => {
    const { name, description, price, stock } = errors
    if (files.length === 0) {
      scrollToPhotos.scrollHook()
      return
    }
    if (name) {
      scrollToName.scrollHook()
      return
    }
    if (description) {
      scrollToDescription.scrollHook()
      return
    }
    if (price) {
      scrollToPrice.scrollHook()
      return
    }
    if (stock) {
      scrollToStock.scrollHook()
    }
  }

  /**
   * RHFはvalueを使わずライブラリ内で処理するので無駄なレンダリングをしなくて済む
   * ここら辺は調査不足なので後で時間をとる
   */
  return (
    <>
      {scrollToPhotos.renderScrollElement()}
      <InputFileMultiple
        files={files}
        onInputFileChange={(value) => onInputFileChange(value)}
      />
      <FormContainer>
        {scrollToName.renderScrollElement()}
        <InputText
          label="name"
          register={register('name')}
          error={'name' in errors}
          helperText={errors.name?.message}
        />
        {scrollToDescription.renderScrollElement()}
        <InputTextarea
          label="description"
          register={register('description')}
          error={'description' in errors}
          helperText={errors.description?.message}
        />
        {scrollToPrice.renderScrollElement()}
        <InputText
          label="price"
          register={register('price')}
          error={'price' in errors}
          helperText={errors.price?.message}
        />
        {scrollToStock.renderScrollElement()}
        <InputText
          label="stock"
          register={register('stock')}
          error={'stock' in errors}
          helperText={errors.stock?.message}
        />
        <InputText
          label="width"
          register={register('width')}
          error={'width' in errors}
          helperText={errors.width?.message}
        />
        <InputText
          label="length"
          register={register('length')}
          error={'length' in errors}
          helperText={errors.length?.message}
        />
        <InputText
          label="height"
          register={register('height')}
          error={'height' in errors}
          helperText={errors.height?.message}
        />
        <InputSelect
          label="category"
          onChange={(e) => onInputChangeSelect(e)}
          options={categoryOptions}
          error={formError.length !== 0}
          helperText={formError}
        />
        <Button isLoading={isLoading} onClick={handleSubmit(onSubmit, onError)}>
          完了
        </Button>
      </FormContainer>
    </>
  )
}
