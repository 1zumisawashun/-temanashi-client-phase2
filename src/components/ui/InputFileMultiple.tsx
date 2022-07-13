import { useState } from "react";

import { CloseButton, BasicButton, BasicModal, TextError } from ".";
import { useDisclosure, useDragAndDrop } from "../../hooks";
import styled from "@emotion/styled";

const CloseButtonContainer = styled("div")`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 30px;
  left: 79%;
  position: relative;
  top: 11%;
`;
const CloseButtonContainerHidden = styled("div")`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 30px;
  left: 79%;
  opacity: 0;
  pointer-events: none;
  position: relative;
  top: 11%;
`;

interface PhotosUploadProps {
  name?: string; // NOTE:input["file"]とlabelをリンクさせるためのフラグ
  files: File[];
  onInputFileChange: (files: File[]) => void;
}

const mineType = [
  "image/gif",
  "image/jpeg",
  "image/png",
  "image/bmp",
  "image/svg+xml",
];

export const InputFileMulti: React.VFC<PhotosUploadProps> = ({
  name = "photos",
  files,
  onInputFileChange,
}): React.ReactElement => {
  const executeModal = useDisclosure();
  const { dragRef } = useDragAndDrop();
  const [isError, setIsError] = useState<string>("");

  const handleCancel = (photoIndex: number) => {
    setIsError("");
    if (!files) return;
    const modifyPhotos = files.filter((file, index) => photoIndex !== index);
    onInputFileChange(modifyPhotos);
    executeModal.close();
  };

  const handleFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
    let newFiles: File[] = [];

    if (event.target.files === null || event.target.files.length === 0) {
      return;
    }

    const copiedFiles = Object.values(event.target.files).concat();
    // eslint-disable-next-line
    event.target.value = "";
    setIsError("");

    const checkedFiles = copiedFiles.filter((copiedFile) => {
      if (!mineType.includes(copiedFile.type)) {
        setIsError(
          "※jpeg, png, bmp, gif, svg以外のファイル形式は表示されません"
        );
        return false;
      }
      if (files.length !== 0) {
        const existsSameSize = files.some(
          (file) => file.size === copiedFile.size
        );
        if (existsSameSize) {
          setIsError("※既に選択された画像と同じものは表示されません");
          return false;
        }
      }
      return true;
    });

    if (checkedFiles.length === 0) {
      return;
    }

    newFiles = [...files, ...checkedFiles];

    if (newFiles.length >= 4) {
      setIsError("※3枚を超えて選択された画像は表示されません");
      return;
    }

    onInputFileChange(newFiles.slice(0, 3));
  };
  return (
    <>
      <div className="photos-container" ref={dragRef}>
        {[...Array(3)].map((_: number, index: number) =>
          files !== null && index < files.length ? (
            <div key={`select-file-${index}`}>
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
                  src={URL.createObjectURL(files[index])}
                  alt={`あなたの写真 ${index + 1}`}
                  width="200"
                  className="image"
                />
              </div>
            </div>
          ) : (
            <div key={`no-file-${index}`}>
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

      <TextError error={isError} helperText={isError} />

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
