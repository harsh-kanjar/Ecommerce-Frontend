import ProductCard from "../Components/ProductCard";
import { useContext, useEffect } from "react";
import productContext from "../context/products/productContext";

function Products() {
  const context = useContext(productContext); // Fetching products
  const { products, getAllProduct } = context; //destructuring

  return (
    <>
      <ProductCard products={products} getAllProduct={getAllProduct} />
    </>
  )
}

export default Products
