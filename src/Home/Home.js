import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [paginate, setPaginate] = useState([]);
  const { data, loading, error } = useSelector((state) => state.data);
  const pagination = () => {
    const help = [];
    for (let i = 1; i < data.length / 8; i++) {
      help.push(i);
    }
    setPaginate([...help]);
  };

  useEffect(() => {
    pagination();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page, data]);

  return (
    <div>
      {loading ? (
        <div className="flex h-screen justify-center items-center">
          <div className="loader">
            <div className="box-1"></div>
            <span>Loading.....</span>
          </div>
        </div>
      ) : error ? (
        <div className="flex justify-center h-screen items-center">
          <span className="text-6xl bg-red-100 text-red-800 text-xs text-5xl font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300 text-5xl">
            {error}
          </span>
        </div>
      ) : (
        <div className="flex flex-col justify-center">
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-10 mt-8 mx-4">
            {data.slice((page - 1) * 9, page * 9).map((item) => {
              return (
                <div
                  className="bg-gray-200 rounded-lg items-center cursor-pointer p-4"
                  key={item._id}
                  onClick={() => navigate(`/product-view/${item._id}`)}
                >
                  <div className="flex flex-col justify-center items-center">
                    <img
                      className="xl:w-72 lg:w-64 md:w-60 sm:w-56 xsm:w-52 xxsm:w-48  my-8"
                      src={item.image}
                    ></img>
                    <p className="mb-8 lg:text-4xl md:text-3xl sm:text-2xl xsm:text-2xl xxsm:text-2xl  text-center	">
                      {item.name}
                    </p>
                    <p className="mb-8 text-red-600 lg:text-2xl md:text-2xl sm:text-xl xsm:text-xl xxsm:text-xl">
                      Stock: {item.countInStock}
                    </p>
                  </div>
                  <div className="flex flex-row justify-between">
                    <p className="ml-6 lg:text-2xl md:text-2xl sm:text-xl xsm:text-xl xxsm:text-xl">
                      {item.price}$
                    </p>
                    <p className="mr-6 lg:text-2xl md:text-2xl sm:text-xl xsm:text-xl xxsm:text-xl">
                      Rating: {item.rating}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="my-12">
            <div className="flex items-center justify-center py-10 lg:px-0 sm:px-6 px-4 ">
              <div className="lg:w-2/5 w-full  flex items-center justify-between border-t border-gray-200 dark:border-gray-700">
                <div
                  className="flex items-center pt-3 text-gray-600 dark:text-gray-200  hover:text-indigo-700 cursor-pointer"
                  onClick={() => {
                    if (page > 1) {
                      setPage((last) => last - 1);
                    }
                  }}
                >
                  <svg
                    className="mb-3"
                    width="14"
                    height="8"
                    viewBox="0 0 14 8"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1.1665 4H12.8332"
                      stroke="currentColor"
                      stroke-width="1.25"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M1.1665 4L4.49984 7.33333"
                      stroke="currentColor"
                      stroke-width="1.25"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M1.1665 4.00002L4.49984 0.666687"
                      stroke="currentColor"
                      stroke-width="1.25"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  <p className="text-xl ml-3 font-medium leading-none ">
                    Previous
                  </p>
                </div>
                <div className="sm:flex hidden">
                  {paginate.map((item) => (
                    <p
                      className="text-xl font-medium leading-none cursor-pointer text-gray-600 dark:text-gray-200  hover:text-indigo-700 dark:hover:text-indigo-400 border-t border-transparent hover:border-indigo-400 pt-3 mr-4 px-2"
                      key={item}
                      onClick={() => setPage(item)}
                      active={item == page}
                    >
                      {item}
                    </p>
                  ))}
                </div>
                <div
                  className="flex items-center pt-3 text-gray-600 dark:text-gray-200  hover:text-indigo-700 cursor-pointer"
                  onClick={() => {
                    if (page < paginate.length) {
                      setPage((last) => last + 1);
                    }
                  }}
                >
                  <p className="text-xl font-medium leading-none mr-3">Next</p>
                  <svg
                    className="mb-3"
                    width="14"
                    height="8"
                    viewBox="0 0 14 8"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1.1665 4H12.8332"
                      stroke="currentColor"
                      stroke-width="1.25"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M9.5 7.33333L12.8333 4"
                      stroke="currentColor"
                      stroke-width="1.25"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M9.5 0.666687L12.8333 4.00002"
                      stroke="currentColor"
                      stroke-width="1.25"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
