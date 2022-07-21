import { ErrorForbidden } from '../components/uis'
import { Head } from '../components/layouts'

export const Error: React.VFC = () => {
  return (
    <>
      <Head title="StripeError.tsx" />
      <ErrorForbidden />
    </>
  )
}
