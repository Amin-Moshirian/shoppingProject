import {
  legacy_createStore as createStore,
  combineReducers,
  applyMiddleware,
} from "redux";
import thunk from "redux-thunk";
import { data, cart, profile } from "./reducer";
const reducer = combineReducers({ data, cart, profile });
const middleware = [thunk];
const shoppingCart = JSON.parse(localStorage.getItem("cart"))
  ? JSON.parse(localStorage.getItem("cart"))
  : [];
const initialState = { cart: { cart: [...shoppingCart] } };
const store = createStore(
  reducer,
  initialState,
  applyMiddleware(...middleware)
);
export default store;
