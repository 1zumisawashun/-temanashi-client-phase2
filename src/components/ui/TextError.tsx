import styled from "@emotion/styled";

const ErrorText = styled("p")`
  font-weight: 400;
  font-size: 0.75rem;
  line-height: 1.66;
  letter-spacing: 0.03333em;
  text-align: left;
  margin-top: 3px;
  margin-right: 14px;
  margin-bottom: 0;
  margin-left: 14px;
  color: #d32f2f;
`;

export type TextErrorProps = {
  error?: boolean | null | string;
  helperText?: string | null;
};

/**
 * MUIと同じレイアウトのエラーメッセージ
 * react-hook-formとyupでのバリデーションに組み込めないローカルバリデーションに当てる
 */
export const TextError: React.VFC<TextErrorProps> = ({
  error = false,
  helperText = "エラーが発生しました",
}) => {
  return error ? <ErrorText>{helperText}</ErrorText> : <></>;
};
