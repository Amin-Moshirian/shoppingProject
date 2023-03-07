import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Header from "./Header/Main/Header";
import Router from "./Router";
import { getData, getProfile } from "./redux/action";
import { useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getData());
    dispatch(getProfile());
  }, []);

  return (
    <div className="App">
      <Header />
      <Router />
      <ToastContainer />
    </div>
  );
}
export default App;
