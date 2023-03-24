import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { addToCart } from "../redux/action";

// display single product

const Product = () => {
  const { products } = useParams();
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.data);

  return data.map((item) => {
    if (item._id === products) {
      return (
        <div
          key={item._id}
          className="sm:3/5 lg:w-1/2 flex mt-10 flex-col justify-center items-center bg-gray-200 mx-auto rounded-lg"
        >
          <div className="flex flex-col justify-center items-center">
            <img
              className="xl:w-72 lg:w-64 md:w-60 sm:w-56 xsm:w-52 xxsm:w-48 h-64 my-8"
              src={item.image}
            ></img>
            <p className="mb-8 text-center sm: text-2xl md:text-2xl lg:text-4xl">
              {item.name}
            </p>
            <p className="mb-8 md:text-xl  lg:text-2xl">Brand: {item.brand}</p>
            <p className="mb-8 md:text-xl lg:text-2xl">Color: {item.color}</p>
            <p className="mb-8 md:text-xl  lg:text-2xl">
              Category: {item.category}
            </p>
            <p className="mb-8 text-red-600 md:text-xl lg:text-2xl">
              Stock: {item.countInStock}
            </p>
          </div>
          <div className="flex  w-3/5 justify-between mb-4">
            <p className="lg:text-2xl sm: text-xl">Price: {item.price}$</p>
            <p className="lg:text-2xl sm: text-xl">Rating: {item.rating}</p>
          </div>

          <div className="">
            <button
              type="button"
              className={
                item.countInStock === 0
                  ? "bg-gray-500 cursor-not-allowed text-white font-bold py-2 px-4 rounded-full mb-10 active:translate-y-0.5"
                  : "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mb-10 active:translate-y-0.5"
              }
              onClick={() => {
                dispatch(addToCart(item));
              }}
            >
              Add to cart
            </button>
          </div>
        </div>
      );
    }
  });
};

export default Product;
