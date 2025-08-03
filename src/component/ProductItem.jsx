// src/components/ProductItem.jsx
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import "./ProductItem.css";

const ProductItem = ({ product }) => {//we get product from parent
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        id: product.id,
        title: product.title,
        price: product.price,
        thumbnail: product.thumbnail,
        quantity: 1,  // Default quantity
      })
    );
  };

  return (
    <div className="product-item">
      <img src={product.thumbnail} alt={product.title} />
      <h3>{product.title}</h3>
      <p>₹{(Math.round(product.price*80*100)/100) }</p>
      <div className="product-actions">
        <Link to={`/product/${product.id}`} className="details-btn">View Details</Link>
        <button className="add-cart-btn" onClick={handleAddToCart}>Add to Cart</button>
      </div>
    </div>
  );
};

export default ProductItem;
