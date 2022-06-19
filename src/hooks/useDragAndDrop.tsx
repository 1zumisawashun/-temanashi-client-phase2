import { useState, useEffect, useRef, useCallback } from "react";

export const useDragAndDrop = () => {
  const [isDragging, setIsDragging] = useState<boolean>(false); // eslint-disable-line
  const dragRef = useRef<HTMLDivElement | null>(null);

  const handleDragIn = useCallback((e: DragEvent): void => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDragOut = useCallback((e: DragEvent): void => {
    e.preventDefault();
    e.stopPropagation();

    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e: DragEvent): void => {
    e.preventDefault();
    e.stopPropagation();

    if (e.dataTransfer?.files) {
      setIsDragging(true);
    }
  }, []);

  const handleDrop = useCallback(
    (e: DragEvent): void => {
      e.preventDefault();
      e.stopPropagation();
      if (e.dataTransfer) {
        const selectedFiles = e.dataTransfer.files;
        console.log(selectedFiles, "selectedFiles");
        // const validateSelectedFiles = checkSelectFiles(selectedFiles);
        // onChangeFiles(validateSelectedFiles);
      }
      setIsDragging(false);
    },
    // [onChangeFiles]
    []
  );

  // const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const selectedFiles = e.target.files;
  //   if (selectedFiles) {
  //     const validateSelectedFiles = checkSelectFiles(selectedFiles);
  //     onChangeFiles(validateSelectedFiles);
  //   }
  //   e.target.value = '';
  // };

  const initDragEvents = useCallback((): void => {
    if (dragRef.current !== null) {
      dragRef.current.addEventListener("dragenter", handleDragIn);
      dragRef.current.addEventListener("dragleave", handleDragOut);
      dragRef.current.addEventListener("dragover", handleDragOver);
      dragRef.current.addEventListener("drop", handleDrop);
    }
  }, [handleDragIn, handleDragOut, handleDragOver, handleDrop]);

  const resetDragEvents = useCallback((): void => {
    if (dragRef.current !== null) {
      dragRef.current.removeEventListener("dragenter", handleDragIn);
      dragRef.current.removeEventListener("dragleave", handleDragOut);
      dragRef.current.removeEventListener("dragover", handleDragOver);
      dragRef.current.removeEventListener("drop", handleDrop);
    }
  }, [handleDragIn, handleDragOut, handleDragOver, handleDrop]);

  useEffect(() => {
    initDragEvents();
    return () => resetDragEvents();
  }, [initDragEvents, resetDragEvents]);

  return { dragRef };
};

export default useDragAndDrop;
