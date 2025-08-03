// src/components/Header.jsx
import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { setSearchQuery } from "../redux/searchSlice";
import "./Header.css";

const Header = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const dispatch = useDispatch();

  const handleSearch = (e) => {
    dispatch(setSearchQuery(e.target.value));
  };

  return (
    <header className="header">
      <div className="logo">
        <Link to="/">🛒 ShoppyGlobe</Link>
      </div>

      <input
        type="text"
        placeholder="Search products..."
        className="search-input"
        onChange={handleSearch}
      />

      <nav className="nav-links">
        <Link to="/" >Home</Link>
        <Link to="/cart" className="cart-icon">
          <FaShoppingCart />
          {totalQuantity > 0 && <span className="cart-badge">{totalQuantity}</span>}
        </Link>
      </nav>
    </header>
  );
};

export default Header;
