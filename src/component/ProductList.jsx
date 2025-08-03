import { useSelector } from "react-redux";
import useFetchProducts from "../hooks/useFetchProducts";
import ProductItem from "./ProductItem";
import ErrorPage from "./ErrorPage";
import Loader from "./Loader";
import "./ProductList.css";

const ProductList = () => {
  const { products, error, loading } = useFetchProducts();
  const searchQuery = useSelector((state) => state.search.query.toLowerCase());

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchQuery)
  );

  if (loading) return <Loader />;
  if (error) return <ErrorPage message={error} />;
  //this displays actual list on home page 
  return (
    <div className="product-list">
      {filteredProducts.length > 0 ? (
        filteredProducts.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))
      ) : (
        <p style={{ textAlign: "center", fontSize: "1.2rem" }}>
          No products found.
        </p>
      )}
    </div>
  );
};

export default ProductList;
