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
      {!data.success ? (
        <Route path="/login" element={<Login />} />
      ) : (
        <Route path="*" element={<Notfound />} />
      )}

      {!data.success ? (
        <Route path="/signup" element={<SignUp />} />
      ) : (
        <Route path="*" element={<Notfound />} />
      )}
      {data.success ? (
        <Route path="/address" element={<Address />} />
      ) : (
        <Route path="*" element={<Notfound />} />
      )}
      <Route path="/product-view/:products" element={<Product />} />
      {data.success ? (
        <Route path="/cheakout" element={<CheakOut />} />
      ) : (
        <Route path="*" element={<Notfound />} />
      )}
      {data.success ? (
        <Route path="/profile" element={<Profile />} />
      ) : (
        <Route path="*" element={<Notfound />} />
      )}
      {data.success ? (
        <Route path="/orders" element={<Orders />} />
      ) : (
        <Route path="*" element={<Notfound />} />
      )}
      {data.success ? (
        <Route path="/orders/:orderId" element={<SingleOrder />} />
      ) : (
        <Route path="*" element={<Notfound />} />
      )}

      {data.success ? (
        <Route path="/setting" element={<Setting />}>
          <Route path="change-profile" element={<ChangeProfile />} />
          <Route path="change-password" element={<ChangePassword />} />
          <Route path="upload-avatar" element={<UploadAvatar />} />
        </Route>
      ) : (
        <Route path="*" element={<Notfound />} />
      )}

      <Route path="*" element={<Notfound />} />
    </Routes>
  );
};

export default Router;
