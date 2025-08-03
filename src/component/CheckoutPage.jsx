import { useSelector } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { clearCart } from "../redux/cartSlice"; // adjust path if needed
import 'react-toastify/dist/ReactToastify.css';
import "./CheckoutPage.css";

const CheckoutPage = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const totalAmount = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const navigate = useNavigate();

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [formData, setFormData] = useState({ email: "", phone: "", address: "" });
  const [errors, setErrors] = useState({});
  const [addressSaved, setAddressSaved] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Valid email is required";
    if (!formData.phone || !/^\d{10}$/.test(formData.phone)) newErrors.phone = "Valid 10-digit phone is required";
    if (!formData.address) newErrors.address = "Address is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setModalIsOpen(false);
      setAddressSaved(true);
      toast.success("Billing Info Saved Successfully!");
    }
  };

  const handlePlaceOrder = () => {
    toast.success("Order Placed Successfully! 🎉");
    dispatch(clearCart()); // ✅ Clear cart
    setTimeout(() => {
      navigate("/");
    }, 2000); // Redirect after 2s
  };

  return (
    <div className="checkout-container">
      <ToastContainer position="top-center" autoClose={1500} />

      <h2>Order Summary</h2>
      <div className="checkout-items">
        {cartItems.map((item) => (
          <div key={item.id} className="checkout-item">
            <img src={item.thumbnail} alt={item.title} />
            <div className="item-details">
              <h3>{item.title}</h3>
              <p>Qty: {item.quantity}</p>
              <p>Price: ₹{(Math.round(item.price * item.quantity * 80 * 100) / 100)}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="order-summary">
        <h3>Total Amount:  ₹{(Math.round(totalAmount * 80 * 100) / 100)}</h3>

        {/* Display Address if saved */}
        {addressSaved ? (
          <div className="saved-address">
            <h4>Billing Info:</h4>
            <p>Email: {formData.email}</p>
            <p>Phone: {formData.phone}</p>
            <p>Address: {formData.address}</p>
          </div>
        ) : (
          <p className="address-warning">No Billing Info Added</p>
        )}

        <button className="update-billing-btn" onClick={() => setModalIsOpen(true)}>
          Update Billing Info
        </button>

        <button
          className="place-order-btn"
          disabled={!addressSaved}
          onClick={handlePlaceOrder}
        >
          Place Order
        </button>
      </div>

      {/* Address Modal */}
      <Modal
        isOpen={modalIsOpen}
        className="address-modal"
        overlayClassName="overlay"
        ariaHideApp={false}
      >
        <button className="modal-close-btn" onClick={() => setModalIsOpen(false)}>×</button>
        <h2>Enter Shipping Details</h2>
        <form onSubmit={handleSubmit} className="address-form">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
          />
          {errors.email && <span className="error">{errors.email}</span>}

          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleInputChange}
          />
          {errors.phone && <span className="error">{errors.phone}</span>}

          <textarea
            name="address"
            placeholder="Shipping Address"
            value={formData.address}
            onChange={handleInputChange}
          />
          {errors.address && <span className="error">{errors.address}</span>}

          <button type="submit" className="save-address-btn">Save Address</button>
        </form>
      </Modal>
    </div>
  );
};

export default CheckoutPage;
