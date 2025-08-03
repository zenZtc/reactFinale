import { Link } from "react-router-dom";
import "./ErrorPage.css";
// Error page it is for Api errors 
const ErrorPage = ({ message }) => {
  return (
    <div className="error-container">
      <div className="error-graphic">
        <div className="error-circle"></div>
        <div className="error-icon">⚠️</div>
      </div>
      <h1>Oops!</h1>
      <p>{message || "We couldn’t fetch the data."}</p>
      <Link to="/" className="error-btn">
        Go Back Home
      </Link>
    </div>
  );
};

export default ErrorPage;
