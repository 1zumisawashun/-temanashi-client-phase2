import { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { useStorage, useReactScroll, useToken } from "../../hooks";
import { categoryOptions, text } from "../../utilities/constant";
import {
  InputSelect,
  InputText,
  InputTextarea,
  InputFileMulti,
  Loading,
  BasicButton,
} from "../ui";
import { OptionProps } from "../ui/InputSelect";
import { MultiValue } from "react-select";
import { useForm, SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import styled from "@emotion/styled";

const FormContainer = styled("div")`
  display: grid;
  gap: 20px;
`;

interface FormData {
  name: string;
  description: string;
  price: string;
  width: string;
  length: string;
  height: string;
  stock: string;
}

const CreateProject: React.VFC = () => {
  const history = useHistory();
  const { getStorageUrl } = useStorage();
  const { cookies } = useToken();

  const scrollToPhotos = useReactScroll("photos");
  const scrollToName = useReactScroll("name");
  const scrollToDescription = useReactScroll("description");
  const scrollToPrice = useReactScroll("price");

  const getSchema = () => {
    return yup.object({
      name: yup.string().required("名前を入力してください。"),
      description: yup.string().required("説明を入力してください。"),
      price: yup.string().required("価格を入力してください。"),
      width: yup.string().required("幅を入力してください。"),
      length: yup.string().required("深さを入力してください。"),
      height: yup.string().required("高さを入力してください。"),
      stock: yup.string().required("在庫を入力してください。"),
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

  const [formError, setFromError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    description: "",
    price: "",
    width: "",
    length: "",
    height: "",
    stock: "",
  });
  const [files, setFiles] = useState<File[]>([]);
  const [categories, setCategories] = useState<MultiValue<string>>([]);

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onInputChangeSelect = (option: MultiValue<OptionProps>) => {
    const multivalue = option.map((item) => item.value);
    setCategories(multivalue);
  };

  const onInputFileChange = (value: File[]) => {
    setFiles(value);
  };

  const onSubmit = async () => {
    setIsLoading(true);
    setFromError("");

    if (categories.length === 0) {
      setFromError("カテゴリーを選択してください。");
      setIsLoading(false);
      return;
    }

    const result = await getStorageUrl(files);

    if (!result) {
      setFromError("画像を処理できませんでした。");
      setIsLoading(false);
      return;
    }

    // NOTE:複数選択できるが全体の型は修正していないので一旦一個のみポストする
    const furniture = {
      ...formData,
      photos: result,
      category: categories[0],
    };

    try {
      const headers = {
        Authorization: `Bearer ${cookies.jwt}`,
      };
      const res = await axios.post(
        "https://us-central1-temanashi-phase2.cloudfunctions.net/api/stripe-post",
        // `${process.env.REACT_APP_BASE_URL}/api/stripe-post`,
        // "http://localhost:5001/temanashi-phase2/us-central1/api/stripe-post",
        furniture,
        { headers }
      );
      console.log(res);
      setIsLoading(false);
      history.push("/");
    } catch (error) {
      setFromError("Axios Error");
      setIsLoading(false);
    }
  };

  const checkOnPreSubmit = () => {
    if (files.length === 0) scrollToPhotos.scrollHook();
    if (formData.name === "") scrollToName.scrollHook();
    if (formData.description === "") scrollToDescription.scrollHook();
    if (formData.price === "") scrollToPrice.scrollHook();
  };

  const onPreSubmit: SubmitHandler<FormData> = (data) => {
    onSubmit();
  };

  /**
   * RHFはvalueを使わずライブラリ内で処理するので無駄なレンダリングをしなくて済む
   * ここら辺は調査不足なので後で時間をとる
   */
  return (
    <div className="common-container">
      {isLoading && <Loading />}
      {scrollToPhotos.renderScrollElement()}
      <InputFileMulti
        files={files}
        onInputFileChange={(value) => onInputFileChange(value)}
      />
      <FormContainer>
        {scrollToName.renderScrollElement()}
        <InputText
          label="name"
          register={register("name", {
            onChange: (e) => onInputChange(e),
          })}
          error={"name" in errors}
          helperText={errors.name?.message}
        />
        {scrollToDescription.renderScrollElement()}
        <InputTextarea
          label="description"
          register={register("description", {
            onChange: (e) => onInputChange(e),
          })}
          error={"description" in errors}
          helperText={errors.description?.message}
        />
        {scrollToPrice.renderScrollElement()}
        <InputText
          label="price"
          register={register("price", {
            onChange: (e) => onInputChange(e),
          })}
          error={"price" in errors}
          helperText={errors.price?.message}
        />
        <InputText
          label="stock"
          register={register("stock", {
            onChange: (e) => onInputChange(e),
          })}
          error={"stock" in errors}
          helperText={errors.stock?.message}
        />
        <InputText
          label="width"
          register={register("width", {
            onChange: (e) => onInputChange(e),
          })}
          error={"width" in errors}
          helperText={errors.width?.message}
        />
        <InputText
          label="length"
          register={register("length", {
            onChange: (e) => onInputChange(e),
          })}
          error={"length" in errors}
          helperText={errors.length?.message}
        />
        <InputText
          label="height"
          register={register("height", {
            onChange: (e) => onInputChange(e),
          })}
          error={"height" in errors}
          helperText={errors.height?.message}
        />
        <InputSelect
          label="Category"
          onChange={(e) => onInputChangeSelect(e)}
          options={categoryOptions}
          error={formError.length !== 0}
          helperText={formError}
        />
        <BasicButton
          onClick={() => {
            checkOnPreSubmit();
            handleSubmit(onPreSubmit)();
          }}
        >
          完了
        </BasicButton>
      </FormContainer>
    </div>
  );
};

export default CreateProject;
