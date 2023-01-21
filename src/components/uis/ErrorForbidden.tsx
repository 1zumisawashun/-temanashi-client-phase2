import styled from '@emotion/styled'
import { FallbackProps } from 'react-error-boundary'
import { Button } from './index'

const ContentWrapper = styled('div')`
  /* header・footer・sidebar関係なく中央に寄せる */
  align-items: center;
  background: #84bcb4;
  bottom: 0;
  display: flex;
  justify-content: center;
  left: 0;
  min-height: 100vh;
  position: fixed;
  right: 0;
  top: 0;
`

const Content = styled('div')`
  background-color: white;
  border-radius: 10px;
  display: grid;
  max-width: 1100px;
  padding: 60px;
  row-gap: 30px;
`

const Title = styled('h1')`
  font-size: 24px;
  font-weight: bold;
  text-align: center;
`

const Paragraph = styled('p')`
  color: black;
  font-size: 16px;
  line-height: 21px;
  text-align: center;
  word-break: break-all;
`

const FooterContent = styled('div')`
  display: flex;
  gap: 30px;
  justify-content: center;
`

export const ErrorForbidden: React.VFC<Partial<FallbackProps>> = ({
  error,
  resetErrorBoundary
}) => {
  /**
   * react-routerで繊維するのではなくwidndowオブジェクトを使って遷移する
   * browserrouterより上の階層で使うことが想定されるためreact-routerでの繊維ができないため
   * react-error-boundlyのfallbackがIframeでラップされるためreset CSSでIframeを無効化する必要がある
   */
  const moveToTop = () => {
    window.location.href = '/'
  }

  return (
    <ContentWrapper>
      <Content>
        <Title>アクセスしようとしたページが見つかりません</Title>
        {error && <Paragraph>{error.message}</Paragraph>}
        <Paragraph>
          <p>以下の原因が考えられます。</p>
          <p> 1.URLが間違っているか、古い</p>
          <p>2.権限が与えられていない操作</p>
        </Paragraph>
        <Paragraph>
          <p>ご不便をおかけしますが、アドレスをご確認いただくか、</p>
          <p>トップ画面へ戻り本サービスをご利用ください。</p>
        </Paragraph>
        <FooterContent>
          <Button onClick={moveToTop} size="large" variant="error">
            トップ画面に戻る
          </Button>
          {resetErrorBoundary && (
            <Button onClick={resetErrorBoundary} size="large" variant="error">
              もう一度試す
            </Button>
          )}
        </FooterContent>
      </Content>
    </ContentWrapper>
  )
}
