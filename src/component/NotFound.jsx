// src/components/NotFound.jsx
import { Link } from "react-router-dom";
import "./NotFound.css";
// Notfound component when irrelevent URL is hit 
const NotFound = () => {
  return (
    <div className="nf-container">
      <div className="nf-animation">
        <span className="nf-digit">4</span>
        <span className="nf-planet"></span>
        <span className="nf-digit">4</span>
      </div>
      <h1>Page Not Found</h1>
      <p>Looks like you’re lost in space. Let’s bring you back home!</p>
      <Link to="/" className="nf-btn">Go Home</Link>
    </div>
  );
};

export default NotFound;
