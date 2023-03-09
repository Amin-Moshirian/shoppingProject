import axios from "axios";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

// Function for recive all products
export const getData = () => async (dispatch) => {
  try {
    dispatch({
      type: "loading",
      payload: { data: [], loading: true, error: "" },
    });
    const { data } = await axios.get("https://kzico.runflare.run/product/");
    dispatch({
      type: "succses",
      payload: { data: [...data], loading: true, error: "" },
    });
  } catch (error) {
    dispatch({
      type: "failed",
      payload: { data: [], loading: false, error: error.message },
    });
  }
};
// ____________________________________________________________________

//Function for recive user information after login
export const getProfile = () => async (dispatch, getState) => {
  try {
    const { data } = await axios.get(
      "https://kzico.runflare.run/user/profile",
      {
        headers: {
          Authorization: `bearer ${localStorage.getItem("Token")}`,
        },
      }
    );
    localStorage.setItem("user", JSON.stringify(data.user));
    dispatch({
      type: "succses-login",
      payload: { data: { ...data }, error: "" },
    });
  } catch (error) {
    dispatch({
      type: "failed-login",
      payload: { data: {}, error: error.message },
    });
  }
};
// ____________________________________________________________________

// Add product to cart function
export const addToCart = (item) => (dispatch, getState) => {
  dispatch({
    type: "add",
    payload: { ...item, quantity: 1, countInStock: item.countInStock - 1 },
  });
  if (item.countInStock === 0) {
    toast("No more products in stock", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      type: "error",
    });
  }
  localStorage.setItem("cart", JSON.stringify(getState().cart.cart));
};
// ____________________________________________________________________

// The function of adding to the products in the shopping cart
export const plusCart = (item) => (dispatch, getState) => {
  dispatch({
    type: "plus",
    payload: item,
  });
  if (item.countInStock === 0) {
    toast("No more products in stock", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      type: "error",
    });
  }
  localStorage.setItem("cart", JSON.stringify(getState().cart.cart));
};
// ____________________________________________________________________

// The function to reduce  to the products in the shopping cart
export const minusCart = (item) => (dispatch, getState) => {
  dispatch({
    type: "minus",
    payload: item,
  });
  localStorage.setItem("cart", JSON.stringify(getState().cart.cart));
};
// ____________________________________________________________________

// The function of emptying the shopping cart when its value reaches one
export const remove = (item) => (dispatch, getState) => {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, discard it!",
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire("Discarded!", "Your product has been discarded.", "success");
      dispatch({
        type: "remove",
        payload: item,
      });
      localStorage.setItem("cart", JSON.stringify(getState().cart.cart));
    }
  });
};
// ____________________________________________________________________

// Function to empty the entire shopping cart
export const clear = () => (dispatch, getState) => {
  dispatch({
    type: "clear",
    payload: [],
  });
  localStorage.setItem("cart", JSON.stringify(getState().cart.cart));
};
// ____________________________________________________________________
