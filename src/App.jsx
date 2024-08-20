import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./Components/Navbar";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import AllPages from "./Pages/AllPages";
import Products from "./Pages/Products";
import ProductsState from "./context/products/ProductsState";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import AddProduct from "./Pages/AddProduct";
import UploadImages from "./Pages/UploadImages";
import Gallery from "./Pages/Gallery"
import UserInfo from "./Pages/UserInfo";
import MakeOrder from "./Pages/MakeOrder";
import Cart from "./Pages/Cart";
import ProductDetails from "./Pages/ProductDetails";
import Footer from "./Components/Footer";
import Order from "./Pages/Order";
import MyOrders from "./Pages/MyOrders";
import BottomButton from "./Components/BottomButton";
import OrderSuccess from "./Pages/OrderSuccess";

function App() {
  return (
    <>
      {/* All state variable present in the NoteState will present in all childrens and their childrens and so on */}
      <ProductsState>
        <Router>
          <Navbar />
          <div className="container-fluid">
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/allpages" element={<AllPages />} />
              <Route exact path="/products" element={<Products />} />
              <Route exact path="/login" element={<Login />} />
              <Route exact path="/signup" element={<Signup />} />
              <Route exact path="/user" element={<UserInfo/>} />
              <Route exact path="/makeorder" element={<MakeOrder/>} />
              <Route exact path="/cart" element={<Cart/>} />
              <Route exact path="/order" element={<Order/>} />
              <Route exact path="/myorders" element={<MyOrders/>} />
              <Route exact path="/success" element={<OrderSuccess/>} />
              <Route exact path="/productdetails/:id" element={<ProductDetails/>} />
              <Route exact path="/admin/addproduct" element={<AddProduct/>} />
              <Route exact path="/admin/imagegallery" element={<UploadImages/>} />
              <Route exact path="/admin/gallery" element={<Gallery/>} />
            </Routes>
          </div>
          <BottomButton/>
          <Footer/>
        </Router>
      </ProductsState>

    </>
  );
}

export default App;