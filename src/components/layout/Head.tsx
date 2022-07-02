import { Helmet } from "react-helmet-async";

type HeadProps = {
  title?: string;
  description?: string;
};

export const Head: React.VFC<HeadProps> = ({
  title = "",
  description = "",
}) => {
  return (
    <Helmet
      title={title ? `${title} | Temanashi` : undefined}
      defaultTitle="Temanashi"
    >
      <meta name="description" content={description} />
    </Helmet>
  );
};
