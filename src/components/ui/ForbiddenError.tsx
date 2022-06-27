import { useHistory } from "react-router-dom";
import styled from "@emotion/styled";
import { BasicButton } from "./index";

const ContentWrapper = styled("div")`
  background: #84bcb4;
  display: flex;
  height: 100%;
  justify-content: center;
  min-height: 100vh;
  width: 100%;
`;

const Content = styled("div")`
  background-color: white;
  border-radius: 10px;
  height: 388px;
  margin: 120px 340px;
  max-width: 1100px;
  width: 100%;
`;

const Title = styled("h1")`
  font-size: 24px;
  font-weight: 700;
  margin-top: 40px;
  text-align: center;
`;

const FirstParagraph = styled("p")`
  color: black;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 21px;
  margin-top: 63px;
  text-align: center;
`;

const FooterContent = styled("div")`
  margin-bottom: 40px;
  margin-top: 47px;
  text-align: center;
`;

export const ForbiddenError: React.VFC = () => {
  const history = useHistory();
  return (
    <ContentWrapper>
      <Content>
        <Title>アクセスしようとしたページが見つかりません</Title>
        <FirstParagraph>
          以下の原因が考えられます。
          <br /> 1.URLが間違っているか、古い
          <br />
          2.権限が与えられていない操作
          <br />
          <br />
          ご不便をおかけしますが、アドレスをご確認いただくか、
          <br />
          引き続き1つ前のページから本サービスをご利用ください。
        </FirstParagraph>
        <FooterContent>
          <BasicButton onClick={() => history.push("/")}>
            前の画面に戻る
          </BasicButton>
        </FooterContent>
      </Content>
    </ContentWrapper>
  );
};
