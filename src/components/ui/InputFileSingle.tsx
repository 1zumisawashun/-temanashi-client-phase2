import { useState } from "react";
import { BasicButton, TextError } from ".";
import UploadFileIcon from "@mui/icons-material/UploadFile";

interface InputFileSingleProps {
  thumbnail: File | null;
  onInputFileChange: (e: File) => void;
}

const InputFileSingle: React.VFC<InputFileSingleProps> = ({
  thumbnail,
  onInputFileChange,
}) => {
  const [thumbnailError, setThumbnailError] = useState<string | null>(null);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    let selected;

    if (e.target.files !== null) {
      const copiedFile = e.target.files[0];
      selected = copiedFile;
    }
    if (!selected) {
      setThumbnailError("please select a file");
      return;
    }
    if (!selected.type.includes("image")) {
      setThumbnailError("selected file must be an image");
      return;
    }
    if (selected.size > 1000000) {
      setThumbnailError("image file size must be less than 100kb");
      return;
    }

    setThumbnailError(null);
    onInputFileChange(selected);
  };

  return (
    <>
      <BasicButton
        fullWidth
        variant="secondary"
        icon={<UploadFileIcon />}
        size="large"
      >
        <label htmlFor="singleFile">
          {thumbnail ? <p>{thumbnail.name}</p> : <p>UPLOAD</p>}
        </label>
      </BasicButton>

      <TextError error={thumbnailError} helperText={thumbnailError} />

      <input
        type="file"
        onChange={handleUpload}
        hidden
        name="singleFile"
        id="singleFile"
      />
    </>
  );
};

export default InputFileSingle;
