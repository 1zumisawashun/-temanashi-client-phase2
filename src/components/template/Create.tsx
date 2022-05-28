import { useState, FormEvent } from "react";
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

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
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
          name="name"
          value={formData.name}
          onChange={(e) => onInputChange(e)}
        />
        <InputText
          label="description"
          name="description"
          value={formData.description}
          onChange={(e) => onInputChange(e)}
        />
        <InputText
          label="price"
          name="price"
          type="number"
          value={formData.price}
          onChange={(e) => onInputChange(e)}
        />
        <InputText
          label="strock"
          name="strock"
          type="number"
          value={formData.stock}
          onChange={(e) => onInputChange(e)}
        />
        <InputText
          label="width"
          name="width"
          type="number"
          value={formData.width}
          onChange={(e) => onInputChange(e)}
        />
        <InputText
          label="length"
          name="length"
          type="number"
          value={formData.length}
          onChange={(e) => onInputChange(e)}
        />
        <InputText
          label="height"
          name="height"
          type="number"
          value={formData.height}
          onChange={(e) => onInputChange(e)}
        />
        <InputSelect
          label="Category"
          onChange={(e) => onInputChangeSelect(e)}
          options={categories}
        />
        <BasicButton onClick={handleSubmit}>Add Funiture</BasicButton>
        {formError && <p className="error">{formError}</p>}
      </form>
    </div>
  );
};

export default CreateProject;
