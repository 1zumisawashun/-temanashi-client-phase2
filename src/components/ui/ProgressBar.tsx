import { useState, useEffect } from "react";
import styled from "@emotion/styled";

const ProgressWrapper = styled("div")`
  max-width: 350px;
  width: 100%;
  background-color: rgb(233, 233, 233);
  border-radius: 0.5rem;
  margin: 20px auto;
`;
const Progress = styled("div")`
  height: 10px;
  background-color: #84bcb4;
  border-radius: 1rem;
  transition: 0.2s ease;
  transition-delay: 0.1s;
`;

type ProgressBarProps = {
  width: number;
  percent: number;
};

const ProgressBar: React.VFC<ProgressBarProps> = ({ width, percent }) => {
  const [value, setValue] = useState<number>(0);

  useEffect(() => {
    setValue(percent * width);
  }, [width, percent]);

  return (
    <ProgressWrapper style={{ width: `${width}%` }}>
      <Progress style={{ width: `${value}%` }} />
    </ProgressWrapper>
  );
};

export default ProgressBar;
