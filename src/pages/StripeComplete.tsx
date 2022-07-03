import { Link } from "react-router-dom";
import { Head } from "../components/layout";

export const Complete: React.VFC = () => {
  return (
    <>
      <Head title="StripeComplete.tsx" />
      <div className="error-container">
        <div className="error-block">
          <div className="main">
            <div className="bubble" />
            <div className="bubble" />
            <div className="bubble" />
            <div className="bubble" />
            <div className="bubble" />
            <div className="bubble" />
            <h1>200</h1>
            <p>It looks like you're seccess !</p>
            <Link to="/" className="goback-button">
              Go back
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
