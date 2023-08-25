import React, { Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "./App.scss";
import HomePage from "./page/HomePage/HomePage";
import DetailPage from "./page/DetailPage/DetailPage";
import Cart from "./page/Cart/Cart";
import ProductPage from "./page/ProductPage/ProductPage";
import CategoryPage from "./page/CategoryPage/CategoryPage";
import SignIn from "./page/SignIn/SignIn";
import SignUp from "./page/SignUp/SignUp";
// import "swiper/scss/autoplay";
// import "swiper/scss";


const App = () => {
  return (
    <div className="App">
      {/* <header className="">
        <HomePage />
      </header> */}
      <Suspense>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage></HomePage>}></Route>
            <Route path="/collections/:slug" element={<ProductPage></ProductPage>}></Route>
            <Route path="/danh-muc/:slug" element={<CategoryPage></CategoryPage>}></Route>
            <Route path="/:slug" element={<DetailPage></DetailPage>}></Route>
            <Route path="/gio-hang" element={<Cart></Cart>}></Route>
            <Route path="/account/login" element={<SignIn></SignIn>}></Route>
            <Route path="/account/register" element={<SignUp></SignUp>}></Route>
          </Routes>
        </Router>
      </Suspense>
    </div>
  );
};

export default App;
