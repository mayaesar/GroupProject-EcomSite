import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./home/Home";
import Products from "./products/Products";
import Brand from "./brand/Brand"
import ProductDetails from "./products/ProductDetails";
import Signin from "./signin/Signin";
import Account from "./account/Account";
import Cart from "./cart/Cart";
import Wishlist from "./wishlist/Wishlist"
import GlobalStyles from "./GlobalStyles";
import Header from "./Header";
import Footer from "./Footer";
import Category from "./categories/Category";

function App() {
  return(
    <Router>
        <GlobalStyles/>
        <Header />
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/products" element={<Products/>}/>
          <Route path="/brands/:brandId" element={<Brand/>}/>
          <Route path="/products/:item" element={<ProductDetails/>}/>
          <Route path="/categories/:categoryId" element={<Category />}/>
          <Route path="/signin" element={<Signin/>}/>
          <Route path="/account/:user" element={<Account/>}/>
          <Route path="/cart" element={<Cart/>}/>
          <Route path="/wishlist" element={<Wishlist/>} />
        </Routes>
        <Footer />
      </Router>
  );
  
}

export default App;
