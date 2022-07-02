import { ForbiddenError } from "../components/ui";
import { Head } from "../components/layout";

const Error: React.VFC = () => {
  return (
    <>
      <Head title="StripeError.tsx" />
      <ForbiddenError />
    </>
  );
};
export default Error;
