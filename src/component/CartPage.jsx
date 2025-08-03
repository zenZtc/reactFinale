// src/components/CartPage.jsx
import { useSelector, useDispatch } from "react-redux";
import { updateQuantity, removeFromCart } from "../redux/cartSlice";
import { Link, useNavigate } from "react-router-dom";
import "./CartPage.css";


//cart page here .
const CartPage = () => {
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const handleQuantityChange = (id, newQty) => {
    if (newQty < 1) return;  
    dispatch(updateQuantity({ id, quantity: newQty }));
  };

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
  };

  const totalAmount = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (cartItems.length === 0) {
    return (
      <div className="cart-container empty-cart">
        <h2>Your cart is empty 🛒</h2>
        <Link to="/" className="back-home-btn">Go Back Shopping</Link>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      <div className="cart-items">
        {/* cartitem component  */}
        {cartItems.map((item) => (
          <div key={item.id} className="cart-item">
            <img src={item.thumbnail} alt={item.title} />
            <div className="item-info">
              <h3>{item.title}</h3>
              <p>₹{(Math.round(item.price*item.quantity*80*100)/100) }</p>  {/* converting the price to INR*/}
              <div className="quantity-actions">
                <button onClick={() => handleQuantityChange(item.id, item.quantity - 1)}>-</button>
                <input
                  type="number"
                  value={item.quantity}
                  min="1"
                  onChange={(e) =>
                    handleQuantityChange(item.id, parseInt(e.target.value, 10) || 1)
                  }
                />
                <button onClick={() => handleQuantityChange(item.id, item.quantity + 1)}>+</button>
              </div>
              <button className="remove-btn" onClick={() => handleRemove(item.id)}>Remove</button>{/*removing based on carttitem id */}
            </div>
          </div>
        ))}
      </div>

      <div className="cart-summary">
        <h3>Total: ₹{(Math.round(totalAmount*80*100)/100) }</h3>
        <button onClick={() => navigate('/checkout')} className="checkout-btn">Proceed to Checkout</button>
      </div>
    </div>
  );
};

export default CartPage;
