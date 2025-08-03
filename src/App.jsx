// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import Header from "./component/header";
import NotFound from "./component/NotFound";
import Loader from "./component/Loader";  
import CartPage from "./component/CartPage";
import CheckoutPage from "./component/CheckoutPage";
// Lazy-loaded components
const ProductList = lazy(() => import("./component/ProductList"));
const ProductDetail = lazy(() => import("./component/Productdetails"));

const App = () => {
  return (
    <Router>
      <Header />
      <Suspense fallback={<Loader />}>    
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<CartPage/>} />
          <Route path="/checkout" element={<CheckoutPage/>}/>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
