import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { clear } from "../redux/action";

const CheakOut = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);

  // for loop To calculate the total price
  let price = 0;
  for (let i = 0; i < cart.cart.length; i++) {
    price += cart.cart[i].price * cart.cart[i].quantity;
  }
  // ______________________________________________________________

  // Here, shopping cart information and shipping information are sent to the server
  const cheak = async () => {
    try {
      const { data } = await axios.post(
        "https://kzico.runflare.run/order/submit",
        {
          orderItems: cart.cart.map((item) => {
            return {
              product: item._id,
              qty: item.quantity,
            };
          }),
          shippingAddress: {
            address: localStorage.getItem("address"),
            city: localStorage.getItem("city"),
            postalCode: localStorage.getItem("postalCode"),
            phone: localStorage.getItem("phone"),
          },
          paymentMethod: "cash",
          shippingPrice: "5",
          totalPrice: price,
        },
        {
          headers: {
            authorization: `bearer ${localStorage.getItem("Token")}`,
          },
        }
      );

      toast(
        "Your order has been registered and will be sent as soon as possible",
        {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          type: "success",
        }
      );

      /*If the purchase is done successfully,
       the shopping cart information and shipping details will be deleted from the local storage And
       The user is transferred to the home page*/
      localStorage.removeItem("address");
      localStorage.removeItem("city");
      localStorage.removeItem("postalCode");
      localStorage.removeItem("phone");
      dispatch(clear());
      navigate("/");
    } catch (error) {
      toast("you most forgot something", {
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
      console.log(error.response.data.message);
    }
  };
  // ____________________________________________________________________________________

  /* This function has the task of checking two parameters.
    First, it checks whether the user is logged in or not.
     If the user is not logged in, it will redirect the user to the login page.
      Second, it checks whether there is a product in the user's shopping cart or not.
       If there is no product in the user's shopping cart, it will take the user to the home page */
  const done = () => {
    if (cart.cart.length) {
      cheak();
    } else {
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
    }
  };
  // __________________________________________________________________

  // function for editing shipping information
  const EditShipping = () => {
    navigate("/address");
    toast("you can edit your shipping address", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      type: "info",
    });
  };
  // __________________________________________________________________

  return (
    <div>
      {cart.cart.map((item) => {
        return (
          <div
            key={item._id}
            className="w-4/5 mx-auto my-8 bg-orange-400 rounded-md p-4 "
          >
            <div className="xxsm:flex-col xsm:flex-col sm:flex-col  md:flex-col lg:flex-col xl:flex-row flex justify-between items-center h-auto">
              <div>
                <img src={item.image} className="w-40 h-32 pb-4 p-2"></img>
              </div>
              <div className="xl:text-left lg:text-center md:text-center sm:text-center xsm:text-center xxsm:text-center">
                <p className="m-3 lg:text-xl md:text-xl sm:text-xl xsm:text-base	 xxsm:text-base">
                  Name: {item.name}
                </p>
                <p className="m-3 lg:text-xl md:text-xl sm:text-xl xsm:text-base	 xxsm:text-base">
                  Brand: {item.brand}
                </p>
                <p className="m-3 lg:text-xl md:text-xl sm:text-xl xsm:text-base	 xxsm:text-base">
                  Color: {item.color}
                </p>
              </div>
              <div className="xl:text-left lg:text-center md:text-center sm:text-center xsm:text-center xxsm:text-center">
                <p className="m-3 lg:text-xl md:text-xl sm:text-xl xsm:text-base	 xxsm:text-base">
                  Category: {item.category}
                </p>
                <p className="m-3 lg:text-xl md:text-xl sm:text-xl xsm:text-base	 xxsm:text-base">
                  Price: {item.price}$
                </p>
                <p className="m-3 lg:text-xl md:text-xl sm:text-xl xsm:text-base	 xxsm:text-base">
                  Quantity: {item.quantity}
                </p>
              </div>
            </div>
          </div>
        );
      })}
      <div className="w-4/5 mx-auto my-8 bg-blue-400 rounded-md p-3 flex text-center xl:flex-row lg:flex-col md:flex-col sm:flex-col xsm:flex-col xxsm:flex-col">
        <div className="basis-1/2 flex flex-col p-2 ">
          <h4 className="m-3 text-3xl lg:text-2xl md:text-2xl sm:text-2xl xsm:text-lg xxsm:text-lg">
            Shipping address
          </h4>
          <p className="m-3 lg:text-xl text-white md:text-xl sm:text-xl xsm:text-base	 xxsm:text-base	">
            Address: {localStorage.getItem("address")}
          </p>
          <p className="m-3 lg:text-xl text-white md:text-xl sm:text-xl xsm:text-base	 xxsm:text-base	">
            City: {localStorage.getItem("city")}
          </p>
          <p className="m-3 lg:text-xl text-white md:text-xl sm:text-xl xsm:text-base	 xxsm:text-base	">
            Postal code: {localStorage.getItem("postalCode")}
          </p>
          <p className="m-3 lg:text-xl text-white md:text-xl sm:text-xl xsm:text-base	 xxsm:text-base	">
            Phone: {localStorage.getItem("phone")}
          </p>
          <button
            className="m-3 bg-gray-900 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => {
              EditShipping();
            }}
          >
            Edit shipping info
          </button>
        </div>
        <div className="basis-1/2 flex flex-col p-2 ">
          <h4 className="m-3 text-3xl lg:text-2xl md:text-2xl sm:text-2xl xsm:text-lg xxsm:text-lg">
            Shipping payment
          </h4>
          <p className="m-3 lg:text-xl text-white md:text-xl sm:text-xl xsm:text-base	 xxsm:text-base">
            Payment method: Cash
          </p>
          <p className="m-3 lg:text-xl text-white md:text-xl sm:text-xl xsm:text-base	 xxsm:text-base">
            Shipping price: 5$
          </p>
          <p className="m-3 lg:text-xl text-white md:text-xl sm:text-xl xsm:text-base	 xxsm:text-base">
            Price: {price}
          </p>
          <p className="m-3 lg:text-xl text-white md:text-xl sm:text-xl xsm:text-base	 xxsm:text-base">
            Total price: {price + 5}
          </p>
          <div className="flex justify-around m-3">
            <button
              className="bg-yellow-500 hover:bg-yellow-700 text-black font-bold py-2 px-4 rounded-full"
              onClick={() => {
                navigate("/cart");
              }}
            >
              Edit
            </button>
            <button
              className="bg-green-700 hover:bg-green-900 text-white font-bold py-2 px-4 rounded-full"
              onClick={() => done()}
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheakOut;
