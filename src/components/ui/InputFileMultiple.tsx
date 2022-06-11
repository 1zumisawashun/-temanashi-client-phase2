import { useState } from "react";
import { CloseButton, BasicButton, BasicModal } from "../ui";
import { useDisclosure } from "../../hooks";
import styled from "@emotion/styled";

const CloseButtonContainer = styled("div")`
  position: relative;
  font-size: 30px;
  cursor: pointer;
  border: none;
  background: none;
  top: 11%;
  left: 79%;
`;
const CloseButtonContainerHidden = styled("div")`
  position: relative;
  font-size: 30px;
  cursor: pointer;
  border: none;
  background: none;
  top: 11%;
  left: 79%;
  opacity: 0;
  pointer-events: none;
`;

interface PhotosUploadProps {
  name?: string; // NOTE:input["file"]とlabelをリンクさせるためのフラグ
  photos: File[];
  onInputFileChange: (files: File[]) => void;
}

const mineType = [
  "image/gif",
  "image/jpeg",
  "image/png",
  "image/bmp",
  "image/svg+xml",
];

const PhotosUpload: React.VFC<PhotosUploadProps> = ({
  name = "photos",
  photos,
  onInputFileChange,
}): React.ReactElement => {
  const executeModal = useDisclosure();
  const [isError, setIsError] = useState<string>("");

  const handleCancel = (photoIndex: number) => {
    setIsError("");
    if (!photos) return;
    const modifyPhotos = photos.filter((photo, index) => photoIndex !== index);
    onInputFileChange(modifyPhotos);
    executeModal.close();
  };

  const handleFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
    let addedPhotos: File[] = [];

    if (event.target.files === null || event.target.files.length === 0) {
      return;
    }

    const files = Object.values(event.target.files).concat();
    event.target.value = "";
    setIsError("");

    const pickedPhotos = files.filter((file) => {
      if (!mineType.includes(file.type)) {
        setIsError(
          "※jpeg, png, bmp, gif, svg以外のファイル形式は表示されません"
        );
        return false;
      }
      if (photos.length !== 0) {
        const existsSameSize = photos.some((photo) => photo.size === file.size);
        if (existsSameSize) {
          setIsError("※既に選択された画像と同じものは表示されません");
          return false;
        }
      }
      return true;
    });

    if (pickedPhotos.length === 0) {
      return;
    }

    addedPhotos = [...photos, ...pickedPhotos];

    if (addedPhotos.length >= 4) {
      setIsError("※3枚を超えて選択された画像は表示されません");
      return;
    }

    onInputFileChange(addedPhotos.slice(0, 3));
  };
  return (
    <>
      <div className="photos-container">
        {[...Array(3)].map((_: number, index: number) =>
          photos !== null && index < photos.length ? (
            <div>
              <CloseButtonContainer>
                <CloseButton onClick={() => executeModal.open()} />
              </CloseButtonContainer>
              <div className="wrapper">
                <BasicModal
                  title="本当に削除しますか？"
                  open={executeModal.isOpen}
                  handleOpen={() => executeModal.close()}
                  footer={
                    <>
                      <BasicButton onClick={() => handleCancel(index)}>
                        はい
                      </BasicButton>
                      <BasicButton onClick={() => executeModal.close()}>
                        いいえ
                      </BasicButton>
                    </>
                  }
                />
                <img
                  src={URL.createObjectURL(photos[index])}
                  alt={`あなたの写真 ${index + 1}`}
                  width="200"
                  className="image"
                />
              </div>
            </div>
          ) : (
            <div>
              <CloseButtonContainerHidden>
                <CloseButton onClick={() => executeModal.open()} />
              </CloseButtonContainerHidden>
              <label className="wrapper" htmlFor={name}>
                <img
                  src="https://placehold.jp/200x200.png"
                  alt=""
                  className="image"
                />
              </label>
            </div>
          )
        )}
      </div>

      {isError.length !== 0 && <p>{isError}</p>}

      <input
        data-cy="file_upload"
        type="file"
        name={name}
        id={name}
        accept="image/*"
        onChange={handleFile}
        multiple
        hidden
      />
    </>
  );
};

export default PhotosUpload;
