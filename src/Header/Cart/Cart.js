import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { plusCart, minusCart, remove } from "../../redux/action";

const Cart = () => {
  const cart = useSelector((state) => state.cart);

  //profile state to cheak that the user is login or not
  const { data } = useSelector((state) => state.profile);
  // ____________________________________________________________________________________

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // for loop To calculate the total price
  let price = 0;
  for (let i = 0; i < cart.cart.length; i++) {
    price += cart.cart[i].price * cart.cart[i].quantity;
  }
  // ______________________________________________________________

  /*This function checks that if you have already entered the shipping information,
   it is no longer necessary to enter it.
    It also checks that the shopping cart is empty and the user is online.*/
  const pathHandler = () => {
    if (data.success) {
      if (!cart.cart.length) {
        toast("three is no product in your cart", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          type: "warning",
        });
      } else {
        if (
          localStorage.getItem("address") &&
          localStorage.getItem("city") &&
          localStorage.getItem("postalCode") &&
          localStorage.getItem("phone")
        ) {
          navigate("/cheakout");
        } else {
          navigate("/address");
        }
      }
    } else {
      navigate("/login");
      toast("You have to login first", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        type: "warning",
      });
    }
  };
  // __________________________________________________________________

  return (
    <div>
      {!cart.cart.length ? (
        <div className="flex mt-16 justify-center items-center">
          <p className="xl:text-5xl lg:text-4xl md:text-3xl sm:text-2xl ">
            There is no product in your cart
          </p>
        </div>
      ) : (
        <div>
          {cart.cart.map((item) => {
            return (
              <div
                key={item._id}
                className="w-3/5 mx-auto my-8 bg-orange-400 rounded-md"
              >
                <div className="xxsm:flex-col xsm:flex-col sm:flex-col md:flex-col lg:flex-col xl:flex-row flex justify-around items-center h-auto p-4 ">
                  <div>
                    <img src={item.image} className="w-40"></img>
                  </div>

                  <p className="text-xl">{item.name}</p>
                  <p className="text-xl">{item.quantity * item.price}$</p>
                  <div className="flex">
                    {item.quantity === 1 ? (
                      <span
                        className="pt-1.5 mr-2 cursor-pointer active:translate-y-0.5"
                        onClick={() => dispatch(remove(item))}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          class="w-6 h-6"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125l2.25 2.25m0 0l2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
                          />
                        </svg>
                      </span>
                    ) : (
                      <span
                        className="text-2xl mr-2 cursor-pointer bg-red-600 text-white py-0.5 px-1.5 rounded-lg active:translate-y-0.5"
                        onClick={() => {
                          dispatch(minusCart(item));
                        }}
                      >
                        -
                      </span>
                    )}

                    <span className="text-2xl mr-2 ">{item.quantity}</span>
                    <span
                      className={
                        item.countInStock === 0
                          ? "text-2xl cursor-not-allowed bg-gray-600 text-white py-0.5 px-1.5 rounded-lg active:translate-y-0.5"
                          : "text-2xl cursor-pointer bg-green-600 text-white py-0.5 px-1.5 rounded-lg active:translate-y-0.5"
                      }
                      onClick={() => {
                        dispatch(plusCart(item));
                      }}
                    >
                      +
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
      <div className="w-3/5 mx-auto my-8 bg-pink-200 rounded-md flex justify-around items-center">
        <p className="sm:text-xl md:text-2xl lg:text-3xl mt-3 ">
          Total Price: {price}$
        </p>
        <div
          className="flex items-center active:translate-y-0.5 cursor-pointer"
          onClick={() => {
            pathHandler();
          }}
        >
          <span className=" mr-2 mb-1 xl:text-3xl lg:text-2xl md:text-xl sm:text-xl">
            Next
          </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Cart;
