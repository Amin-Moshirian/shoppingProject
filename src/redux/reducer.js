import { toast } from "react-toastify";

// State for recive all products
export const data = (
  state = { data: [], loading: false, error: "" },
  { type, payload }
) => {
  switch (type) {
    case "loading":
      return payload;

    case "succses":
      return payload;

    case "failed":
      return payload;

    default:
      return state;
  }
};
// ____________________________________________________________________

//State for recive user information after login
export const profile = (state = { data: {}, error: "" }, { type, payload }) => {
  switch (type) {
    case "succses-login":
      return payload;

    case "failed-login":
      return payload;

    default:
      return state;
  }
};
// ____________________________________________________________________

// Cart handling states
export const cart = (state = { cart: [] }, { type, payload }) => {
  switch (type) {
    case "add":
      const productExist = state.cart.find((i) => i._id === payload._id);
      if (productExist) {
        toast("product is already existing in your cart", {
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
        return {
          ...state,
        };
      } else if (payload.countInStock > 0) {
        toast("product added in your cart", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          type: "success",
        });
        return {
          ...state,
          cart: [...state.cart, payload],
        };
      }

    case "plus":
      const plus = state.cart.map((item) =>
        item._id === payload._id && item.countInStock > 0
          ? {
              ...item,
              quantity: item.quantity + 1,
              countInStock: item.countInStock - 1,
            }
          : item
      );
      return {
        ...state,
        cart: plus,
      };

    case "minus":
      const minus = state.cart.map((item) =>
        item._id === payload._id && item.quantity > 0
          ? {
              ...item,
              quantity: item.quantity - 1,
              countInStock: item.countInStock + 1,
            }
          : item
      );
      return {
        ...state,
        cart: minus,
      };

    case "remove":
      const remove = state.cart.filter((item) => item._id !== payload._id);
      return {
        ...state,
        cart: remove,
      };

    case "clear":
      return {
        ...state,
        cart: [],
      };
    default:
      return state;
  }
};
// ____________________________________________________________________
