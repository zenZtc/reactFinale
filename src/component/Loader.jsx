// src/components/Loader.jsx
import "./Loader.css";
//loader render when it takes more time than usual 
const Loader = () => {
  return (
    <div className="loader-container">
      <div className="loader-spinner"></div>
      <p className="loader-text">Bringing ShoppyGlobe to life...</p>
    </div>
  );
};

export default Loader;
