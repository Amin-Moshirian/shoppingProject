import React from "react";
import { Route, Routes } from "react-router-dom";
import Cart from "./Header/Cart/Cart";
import Home from "./Home/Home";
import Product from "./Product/Product";
import SignUp from "./SignUp/SignUp";
import Login from "./Header/Login/Login";
import Address from "./Address/Address";
import CheakOut from "./Cheakout/CheakOut";
import Profile from "./Profile/Profile";
import Setting from "./setting/Setting";
import ChangeProfile from "./setting/ChangeProfile";
import ChangePassword from "./setting/ChangePassword";
import UploadAvatar from "./setting/UploadAvatar";
import Orders from "./order/Orders";
import SingleOrder from "./order/SingleOrder";
import Notfound from "./404/Notfound";
import { useSelector } from "react-redux";

const Router = () => {
  const { data } = useSelector((state) => state.profile);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/product-view/:products" element={<Product />} />

      <Route
        path="/login"
        element={!localStorage.getItem("Token") ? <Login /> : <Notfound />}
      />

      <Route
        path="/signup"
        element={!localStorage.getItem("Token") ? <SignUp /> : <Notfound />}
      />
      <Route
        path="/address"
        element={localStorage.getItem("Token") ? <Address /> : <Notfound />}
      />

      <Route
        path="/cheakout"
        element={localStorage.getItem("Token") ? <CheakOut /> : <Notfound />}
      />
      <Route
        path="/profile"
        element={localStorage.getItem("Token") ? <Profile /> : <Notfound />}
      />

      <Route
        path="/orders"
        element={localStorage.getItem("Token") ? <Orders /> : <Notfound />}
      />

      <Route
        path="/orders/:orderId"
        element={localStorage.getItem("Token") ? <SingleOrder /> : <Notfound />}
      />

      <Route
        path="/setting"
        element={localStorage.getItem("Token") ? <Setting /> : <Notfound />}
      >
        <Route path="change-profile" element={<ChangeProfile />} />
        <Route path="change-password" element={<ChangePassword />} />
        <Route path="upload-avatar" element={<UploadAvatar />} />
      </Route>

      <Route path="*" element={<Notfound />} />
    </Routes>
  );
};

export default Router;
