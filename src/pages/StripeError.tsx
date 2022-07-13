import { ErrorForbidden } from "../components/ui";
import { Head } from "../components/layout";

export const Error: React.VFC = () => {
  return (
    <>
      <Head title="StripeError.tsx" />
      <ErrorForbidden />
    </>
  );
};
