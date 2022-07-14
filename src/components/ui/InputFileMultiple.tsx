import { useState } from "react";
import { ButtonIconClose, Button, Modal, ErrorText } from ".";
import { useDisclosure, useDragAndDrop } from "../../hooks";
import styled from "@emotion/styled";

const UploadContainer = styled("div")`
  display: flex;
  justify-content: space-between;
  overflow-x: scroll;
`;
const UploadWrapper = styled("label")`
  width: 240px;
  height: 370px;
  margin: 0 auto 30px;
  align-items: center;
  display: flex;
  justify-content: center;
  background: white;
  border-radius: 4px;
  cursor: pointer;
  border: 1px solid #84bcb4;
`;
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

export const InputFileMultiple: React.VFC<PhotosUploadProps> = ({
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
      <UploadContainer ref={dragRef}>
        {[...Array(3)].map((_: number, index: number) =>
          files !== null && index < files.length ? (
            <div key={`select-file-${_}`}>
              <CloseButtonContainer>
                <ButtonIconClose onClick={() => executeModal.open()} />
              </CloseButtonContainer>
              <UploadWrapper>
                <Modal
                  title="本当に削除しますか？"
                  open={executeModal.isOpen}
                  handleOpen={() => executeModal.close()}
                  footer={
                    <>
                      <Button onClick={() => handleCancel(index)}>はい</Button>
                      <Button onClick={() => executeModal.close()}>
                        いいえ
                      </Button>
                    </>
                  }
                />
                <img
                  src={URL.createObjectURL(files[index])}
                  alt={`あなたの写真 ${index + 1}`}
                  width="200"
                  className="image"
                />
              </UploadWrapper>
            </div>
          ) : (
            <div key={`no-file-${_}`}>
              <CloseButtonContainerHidden>
                <ButtonIconClose onClick={() => executeModal.open()} />
              </CloseButtonContainerHidden>
              <UploadWrapper htmlFor={name}>
                <img
                  src="https://placehold.jp/200x200.png"
                  alt=""
                  className="image"
                />
              </UploadWrapper>
            </div>
          )
        )}
      </UploadContainer>

      <ErrorText error={isError} helperText={isError} />

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
