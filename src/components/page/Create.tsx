import { FC, useState, FormEvent } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useAuth } from "../../hooks/useAuth";
import { useStorage } from "../../hooks/useStorage";
import { categories, text } from "../../utilities/constant";
import { InputSelect, InputText, InputFileMulti, Loading } from "../ui";
import { OptionProps } from "../ui/InputSelect";
import { SingleValue } from "react-select";

interface FormData {
  name: string;
  description: string;
  price: string;
  width: string;
  length: string;
  height: string;
  stock: string;
  random: string;
}

const CreateProject: FC = () => {
  const history = useHistory();
  const { logout } = useAuth();
  const { getStorageUrl, error } = useStorage();

  const [formError, setFromError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [cookies] = useCookies(["random", "jwt"]);

  const [formData, setFormData] = useState<FormData>({
    name: "",
    description: text,
    price: String(Math.floor(Math.random() * 3000)),
    width: String(Math.floor(Math.random() * 100)),
    length: String(Math.floor(Math.random() * 200)),
    height: String(Math.floor(Math.random() * 300)),
    stock: String(Math.floor(Math.random() * 10)),
    random: cookies.random ?? 12345,
  });
  const [photos, setPhotos] = useState<File[] | null>(null);
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
    console.log(category);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setFromError(null);

    if (!category) {
      setFromError("Please select a furniture category");
      return;
    }

    const result = await getStorageUrl(photos);

    if (!result) {
      setFromError(error);
      return;
    }

    const furniture = {
      ...formData,
      photos: result,
      category,
    };

    console.log(furniture, "furniture");

    // // try {
    // const headers = {
    //   Authorization: `Bearer ${cookies.jwt}`,
    // };
    // const result = await axios.post(
    //   // `${process.env.REACT_APP_BASE_URL}/api/stripe-post`,
    //   "https://us-central1-temanashi-phase2.cloudfunctions.net/api/stripe-post",
    //   // "http://localhost:5001/temanashi-phase2/us-central1/api/stripe-post",
    //   furniture,
    //   { headers }
    // );
    // console.log(result);
    // } catch (error) {
    //   alert("Error on CreateFurniture");
    //   logout();
    //   history.push("/login");
    // } finally {
    setIsLoading(false);
    //   history.push("/");
    // }
  };

  return (
    <div className="common-container">
      {isLoading && <Loading />}
      <form onSubmit={handleSubmit}>
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
        <button className="btn">Add Funiture</button>
        {formError && <p className="error">{formError}</p>}
      </form>
    </div>
  );
};

export default CreateProject;
