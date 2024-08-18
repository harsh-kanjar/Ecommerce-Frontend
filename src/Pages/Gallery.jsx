import { useContext } from "react";
import productContext from "../context/products/productContext";
import ImageGallery from "../Components/ImageGallery";

function Gallery() {
  const context = useContext(productContext); // Fetching products
  const { products, getAllProduct } = context; //destructuring

  return (
    <>
      <ImageGallery products={products} getAllProduct={getAllProduct} />
    </>
  )
}

export default Gallery
