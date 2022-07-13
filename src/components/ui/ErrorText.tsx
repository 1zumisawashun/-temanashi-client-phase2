import styled from "@emotion/styled";

const ErrorTextBlock = styled("p")`
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

export type ErrorTextProps = {
  error?: boolean | null | string;
  helperText?: string | null;
};

/**
 * MUIと同じレイアウトのエラーメッセージ
 * react-hook-formとyupでのバリデーションに組み込めないローカルバリデーションに当てる
 */
export const ErrorText: React.VFC<ErrorTextProps> = ({
  error = false,
  helperText = "エラーが発生しました",
}) => {
  return error ? <ErrorTextBlock>{helperText}</ErrorTextBlock> : <ErrorText />;
};
