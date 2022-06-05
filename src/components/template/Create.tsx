import { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { useStorage } from "../../hooks/useStorage";
import { categories, text } from "../../utilities/constant";
import {
  InputSelect,
  InputText,
  InputFileMulti,
  Loading,
  BasicButton,
} from "../ui";
import { OptionProps } from "../ui/InputSelect";
import { SingleValue } from "react-select";
import { useCookies } from "react-cookie";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
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
  const [cookies] = useCookies(["jwt"]);

  // NOTE:yupバリデーションを強化したい
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
  const [category, setCategory] = useState<SingleValue<string>>();

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onInputChangeSelect = (option: SingleValue<OptionProps>) => {
    const value = option?.value;
    setCategory(value);
  };

  const onPreSubmit: SubmitHandler<FormData> = (data) => {
    console.log(data, "onPreSubmit");
    onSubmit();
  };

  const onSubmit = async () => {
    setIsLoading(true);
    setFromError("");

    if (!category) {
      setFromError("Please select a furniture category");
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
      category,
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
        <InputFileMulti photos={photos} setPhotos={setPhotos} />
        <InputText
          label="name"
          register={register("name", {
            onChange: (e) => onInputChange(e),
          })}
          value={formData.name}
          error={"name" in errors}
          helperText={errors.name?.message}
        />
        <InputText
          label="description"
          register={register("description", {
            onChange: (e) => onInputChange(e),
          })}
          value={formData.description}
          error={"description" in errors}
          helperText={errors.description?.message}
        />
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
          options={categories}
        />
        <BasicButton
          onClick={() => {
            handleSubmit(onPreSubmit)();
          }}
        >
          完了
        </BasicButton>
        {formError && (
          <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            {formError}
          </Alert>
        )}
      </form>
    </div>
  );
};

export default CreateProject;
