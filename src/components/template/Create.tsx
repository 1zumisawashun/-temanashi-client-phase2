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
    description: text,
    price: String(Math.floor(Math.random() * 3000)),
    width: String(Math.floor(Math.random() * 100)),
    length: String(Math.floor(Math.random() * 200)),
    height: String(Math.floor(Math.random() * 300)),
    stock: String(Math.floor(Math.random() * 10)),
  });
  const [photos, setPhotos] = useState<File[]>([]);
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
    setPhotos(value);
  };

  const onPreSubmit: SubmitHandler<FormData> = (data) => {
    onSubmit();
  };

  const onSubmit = async () => {
    setIsLoading(true);
    setFromError("");

    if (categories.length === 0) {
      setFromError("カテゴリーを選択してください。");
      setIsLoading(false);
      return;
    }

    const result = await getStorageUrl(photos);

    if (!result) {
      setFromError("画像を処理できませんでした。");
      setIsLoading(false);
      return;
    }

    const furniture = {
      ...formData,
      photos: result,
      // NOTE:複数選択できるが全体の型は修正していないので一旦一個のみポストする
      category: categories[0],
    };

    try {
      const headers = {
        Authorization: `Bearer ${cookies.jwt}`,
      };
      const res = await axios.post(
        // `${process.env.REACT_APP_BASE_URL}/api/stripe-post`,
        "https://us-central1-temanashi-phase2.cloudfunctions.net/api/stripe-post",
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

  return (
    <div className="common-container">
      {isLoading && <Loading />}
      <form>
        {scrollToPhotos.renderScrollElement()}
        <InputFileMulti
          photos={photos}
          onInputFileChange={(value) => onInputFileChange(value)}
        />
        {scrollToName.renderScrollElement()}
        <InputText
          label="name"
          register={register("name", {
            onChange: (e) => onInputChange(e),
          })}
          value={formData.name}
          error={"name" in errors}
          helperText={errors.name?.message}
        />
        {scrollToDescription.renderScrollElement()}
        <InputTextarea
          label="description"
          register={register("description", {
            onChange: (e) => onInputChange(e),
          })}
          value={formData.description}
          error={"description" in errors}
          helperText={errors.description?.message}
        />
        {scrollToPrice.renderScrollElement()}
        <InputText
          label="price"
          register={register("price", {
            onChange: (e) => onInputChange(e),
          })}
          value={formData.price}
          error={"price" in errors}
          helperText={errors.price?.message}
        />
        <InputText
          label="stock"
          register={register("stock", {
            onChange: (e) => onInputChange(e),
          })}
          value={formData.stock}
          error={"stock" in errors}
          helperText={errors.stock?.message}
        />
        <InputText
          label="width"
          register={register("width", {
            onChange: (e) => onInputChange(e),
          })}
          value={formData.width}
          error={"width" in errors}
          helperText={errors.width?.message}
        />
        <InputText
          label="length"
          register={register("length", {
            onChange: (e) => onInputChange(e),
          })}
          value={formData.length}
          error={"length" in errors}
          helperText={errors.length?.message}
        />
        <InputText
          label="height"
          register={register("height", {
            onChange: (e) => onInputChange(e),
          })}
          value={formData.height}
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
            if (photos.length === 0) scrollToPhotos.scrollHook();
            if (formData.name === "") scrollToName.scrollHook();
            if (formData.description === "") scrollToDescription.scrollHook();
            if (formData.price === "") scrollToPrice.scrollHook();
            handleSubmit(onPreSubmit)();
          }}
        >
          完了
        </BasicButton>
      </form>
    </div>
  );
};

export default CreateProject;
