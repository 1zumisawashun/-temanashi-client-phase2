import { useState, useEffect } from "react";
import styled from "@emotion/styled";

const ProgressWrapper = styled("div")<{ width: number }>`
  background-color: rgb(233, 233, 233);
  border-radius: 0.5rem;
  margin: 20px auto;
  max-width: 350px;
  width: 100%;
  width: ${(p) => p.width}%;
`;
const Progress = styled("div")<{ width: number }>`
  background-color: #84bcb4;
  border-radius: 1rem;
  height: 10px;
  transition: 0.2s ease;
  transition-delay: 0.1s;
  width: ${(p) => p.width}%;
`;

type ProgressBarProps = {
  width: number;
  percent: number;
};

export const ProgressBar: React.VFC<ProgressBarProps> = ({
  width,
  percent,
}) => {
  const [value, setValue] = useState<number>(0);

  useEffect(() => {
    setValue(percent * width);
  }, [width, percent]);

  return (
    <ProgressWrapper width={width}>
      <Progress width={value} />
    </ProgressWrapper>
  );
};
