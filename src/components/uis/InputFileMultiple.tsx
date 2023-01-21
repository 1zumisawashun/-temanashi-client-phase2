import { useState } from 'react'
import styled from '@emotion/styled'
import { ButtonIconClose, Button, Modal, ErrorText } from '.'
import { useDisclosure, useDragAndDrop } from '../../functions/hooks'
import { mineType } from '../../functions/constants/minetype'

const UploadContainer = styled('div')`
  width: 100%;
`
const UploadContainerInner = styled('div')`
  display: flex;
  justify-content: space-between;
`
const UploadWrapper = styled('label')`
  align-items: center;
  background: white;
  border: 1px solid #84bcb4;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  height: 370px;
  justify-content: center;
  margin: 0 auto 30px;
  width: 240px;
`
const CloseButtonContainer = styled('div')`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 30px;
  left: 79%;
  position: relative;
  top: 11%;
`
const CloseButtonContainerHidden = styled('div')`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 30px;
  left: 79%;
  opacity: 0;
  pointer-events: none;
  position: relative;
  top: 11%;
`

interface PhotosUploadProps {
  name?: string
  files: File[]
  onInputFileChange: (files: File[]) => void
}

/* eslint-disable no-param-reassign */
/* eslint-disable react/no-array-index-key */

/**
 * DD対応の複数画像アップロード機能
 * DDと手動アップロードでロジックを分岐させonChangeFilesでFilelistを受け取りマージさせている
 * DDと手動アップロードで挟み込むバリデーションが未実装
 */
export const InputFileMultiple: React.VFC<PhotosUploadProps> = ({
  name = 'photos',
  files,
  onInputFileChange
}): React.ReactElement => {
  const executeModal = useDisclosure()
  const [isError, setIsError] = useState<string>('')

  const onChangeFiles = async (event: FileList) => {
    let newFiles: File[] = []

    const copiedFiles = Object.values(event).concat()

    setIsError('')

    const checkedFiles = copiedFiles.filter((copiedFile) => {
      if (!mineType.includes(copiedFile.type)) {
        setIsError(
          '※jpeg, png, bmp, gif, svg以外のファイル形式は表示されません'
        )
        return false
      }
      if (files.length !== 0) {
        const existsSameSize = files.some(
          (file) => file.size === copiedFile.size
        )
        if (existsSameSize) {
          setIsError('※既に選択された画像と同じものは表示されません')
          return false
        }
      }
      return true
    })

    if (checkedFiles.length === 0) {
      return
    }

    newFiles = [...files, ...checkedFiles]

    if (newFiles.length >= 4) {
      setIsError('※3枚を超えて選択された画像は表示されません')
      return
    }

    onInputFileChange(newFiles.slice(0, 3))
  }

  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files
    if (selectedFiles) {
      // FIXME:バリデーションを挟みたい
      onChangeFiles(selectedFiles)
    }
    event.target.value = ''
  }

  const handleCancel = (photoIndex: number) => {
    setIsError('')
    if (!files) return
    const modifyPhotos = files.filter((file, index) => photoIndex !== index)
    onInputFileChange(modifyPhotos)
    executeModal.close()
  }

  const { dragRef } = useDragAndDrop(onChangeFiles)

  return (
    <UploadContainer>
      <UploadContainerInner ref={dragRef}>
        {[...Array(3)].map((_: number, index: number) =>
          files !== null && index < files.length ? (
            <div key={`select-file-${index}`}>
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
            <div key={`no-file-${index}`}>
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
      </UploadContainerInner>

      <ErrorText error={isError} helperText={isError} />

      <input
        data-cy="file_upload"
        type="file"
        name={name}
        id={name}
        accept="image/*"
        onChange={handleUpload}
        multiple
        hidden
      />
    </UploadContainer>
  )
}
