import React, { Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "./App.scss";
import HomePage from "./page/HomePage/HomePage";
import DetailPage from "./page/DetailPage/DetailPage";
import Cart from "./page/Cart/Cart";
import ProductPage from "./page/ProductPage/ProductPage";
import CategoryPage from "./page/CategoryPage/CategoryPage";
import SignUp from "./page/SignUp/SignUp";
// import "swiper/scss/autoplay";
// import "swiper/scss";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import InfoUser from "./page/InfoUser/InfoUser";
import InfoOrders from "./page/InfoOrders/InfoOrders";

const SignIn = React.lazy(() => import("./page/SignIn/SignIn"));

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
            <Route path="/account" element={<InfoUser></InfoUser>}></Route>
            <Route path="/account/orders" element={<InfoOrders></InfoOrders>}></Route>
          </Routes>
        </Router>
      </Suspense>
      <ToastContainer />

    </div >
  );
};

export default App;
