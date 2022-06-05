import React from "react";
import { useHistory } from "react-router-dom";
import styled from "@emotion/styled";
import { BasicButton } from "../ui";

const ContentWrapper = styled("div")`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
  min-height: 100vh;
  background: #84bcb4;
`;

const Content = styled("div")`
  width: 100%;
  max-width: 1100px;
  margin: 120px 340px;
  height: 388px;
  background-color: white;
  border-radius: 10px;
`;

const Title = styled("h1")`
  text-align: center;
  margin-top: 40px;
  font-size: 24px;
  font-weight: 700;
`;

const FirstParagraph = styled("p")`
  color: black;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 21px;
  text-align: center;
  margin-top: 63px;
`;

const FooterContent = styled("div")`
  margin-top: 47px;
  margin-bottom: 40px;
  text-align: center;
`;

const ForbiddenError: React.VFC = () => {
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

export default ForbiddenError;
