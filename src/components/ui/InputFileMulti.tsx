import { useState } from "react";
import { CloseButton } from "./IconButton";
import BasicModal from "./BasicModal";
import BasicButton from "./BasicButton";

interface PhotosUploadProps {
  name?: string; // NOTE:input["file"]とlabelをリンクさせるためのフラグ
  photos: File[];
  setPhotos: (files: File[]) => void;
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
  setPhotos,
}): React.ReactElement => {
  const [isOpenExecute, setIsOpenExecute] = useState(false);
  const [isError, setIsError] = useState<string>("");

  const handleCancel = (photoIndex: number) => {
    setIsError("");
    if (!photos) return;
    const modifyPhotos = photos.filter((photo, index) => photoIndex !== index);
    setPhotos(modifyPhotos);
    closeModal();
  };

  const openModal = () => {
    setIsOpenExecute(true);
  };
  const closeModal = () => {
    setIsOpenExecute(false);
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

    setPhotos(addedPhotos.slice(0, 3));
  };
  return (
    <>
      <div className="photos-container">
        {[...Array(3)].map((_: number, index: number) =>
          photos !== null && index < photos.length ? (
            <div>
              <CloseButton styleName="close-upload" onClick={openModal} />
              <div className="wrapper" key={index}>
                <BasicModal
                  title="本当に削除しますか？"
                  open={isOpenExecute}
                  handleOpen={closeModal}
                  footer={
                    <div className="buttons">
                      <BasicButton onClick={() => handleCancel(index)}>
                        はい
                      </BasicButton>
                      <BasicButton onClick={closeModal}>いいえ</BasicButton>
                    </div>
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
              <CloseButton
                styleName="close-upload -disable"
                onClick={openModal}
              />
              <label className="wrapper" htmlFor={name} key={index}>
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
