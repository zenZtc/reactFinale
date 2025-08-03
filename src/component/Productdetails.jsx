// src/components/ProductDetail.jsx
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { FaStar, FaArrowLeft } from "react-icons/fa";
import {addToCart} from "../redux/cartSlice"
import "./ProductDetail.css";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import ErrorPage from "./ErrorPage";
import Loader from "./Loader";
const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (!id) return;
    const fetchDetail = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`https://dummyjson.com/products/${id}`);//hitting Api to fetch data 
        if (!res.ok) throw new Error("Failed to fetch product details.");
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        setError(err.message || "Something went wrong.");
      } finally {
        setLoading(false);
      }
    };
    fetchDetail();
  }, [id]);

  const cart = useSelector((state) => state.cart.items);
  console.log(cart);

  const increment = () => setQuantity((q) => Math.min(q + 1, product?.stock || 1));
  const decrement = () => setQuantity((q) => Math.max(1, q - 1));

  const handleAddToCart = () => {
    if (!product) return;

    dispatch(
      addToCart({
        id: product.id,
        title: product.title,
        price: product.price,
        thumbnail: product.thumbnail,
        quantity,
      })
    );
  };

  if (loading) return <Loader />;//if its taking more then usual then loading spinner will render 
  if (error) return <ErrorPage/>;//if any error then this error page will , error from API not for the paths that are not defined in react router file
  if (!product) return null;

  return (
    <div className="pd-container">
      <div className="pd-breadcrumbs">
        <Link to="/" className="back-link">
          <FaArrowLeft /> Home
        </Link>
      </div>

      <div className="pd-main">
        <div className="pd-image-wrapper">
          <img src={product.thumbnail} alt={product.title} className="pd-image" />
          {product.images && product.images.length > 1 && (
            <div className="pd-thumb-row">
              {product.images.slice(0, 4).map((img, idx) => (
                <img key={idx} src={img} alt={`${product.title}-${idx}`} className="pd-thumb" />
              ))}
            </div>
          )}
        </div>

        <div className="pd-info">
          <h1 className="pd-title">{product.title}</h1>
          <div className="pd-sub">
            <div className="pd-price-rating">
              <span className="pd-price">₹{(Math.round(product.price*80*100)/100) }</span>
              <div className="pd-rating">
                <FaStar /> <span>{product.rating.toFixed(1)}</span>
              </div>
            </div>
            <div className="pd-category">Category: {product.category}</div>
          </div>

          <p className="pd-description">{product.description}</p>

          <div className="pd-stock">
            {product.stock > 0 ? (
              <span className="in-stock">In stock: {product.stock}</span>
            ) : (
              <span className="out-stock">Out of stock</span>
            )}
          </div>

          <div className="pd-actions">
            <div className="quantity-selector">
              <button onClick={decrement} aria-label="decrease quantity">-</button>
              <input
                type="number"
                value={quantity}
                min={1}
                max={product.stock}
                onChange={(e) => {
                  let v = parseInt(e.target.value, 10);
                  if (isNaN(v)) v = 1;
                  v = Math.max(1, Math.min(product.stock, v));
                  setQuantity(v);
                }}
              />
              <button onClick={increment} aria-label="increase quantity">+</button>
            </div>
            <button
              className="add-cart-btn"
              onClick={handleAddToCart}
              disabled={product.stock === 0}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
