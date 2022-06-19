import styled from "@emotion/styled";

const ErrorText = styled("p")`
  color: #d32f2f;
  font-size: 0.75rem;
  font-weight: 400;
  letter-spacing: 0.03333em;
  line-height: 1.66;
  margin-bottom: 0;
  margin-left: 14px;
  margin-right: 14px;
  margin-top: 3px;
  text-align: left;
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
