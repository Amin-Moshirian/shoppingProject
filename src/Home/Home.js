import React, { useEffect, useState } from "react";
import { Pagination } from "react-bootstrap";
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
        <div className="flex justify-center h-screen items-center m">
          <span className="loader1"></span>
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
                  className="bg-gray-200 rounded-lg items-center cursor-pointer "
                  key={item._id}
                  onClick={() => navigate(`/product-view/${item._id}`)}
                >
                  <div className="flex flex-col justify-center items-center">
                    <img className="w-96 my-8" src={item.image}></img>
                    <p className="mb-8 lg:text-4xl md:text-3xl sm:text-2xl xsm:text-2xl xxsm:text-2xl  text-center	">{item.name}</p>
                    <p className="mb-8 text-red-600 lg:text-2xl md:text-2xl sm:text-xl xsm:text-xl xxsm:text-xl">
                      Stock: {item.countInStock}
                    </p>
                  </div>
                  <div className="flex flex-row justify-between">
                    <p className="ml-6 lg:text-2xl md:text-2xl sm:text-xl xsm:text-xl xxsm:text-xl">{item.price}$</p>
                    <p className="mr-6 lg:text-2xl md:text-2xl sm:text-xl xsm:text-xl xxsm:text-xl">Rating: {item.rating}</p>
                  </div>
                </div>
              );
            })}
          </div>
          <div >
            <Pagination className="justify-center my-12">
              <Pagination.First onClick={() => setPage(1)} />
              <Pagination.Prev
                onClick={() => {
                  if (page > 1) {
                    setPage((last) => last - 1);
                  }
                }}
              />
              {paginate.map((item) => (
                <Pagination.Item
                  key={item}
                  onClick={() => setPage(item)}
                  active={item == page}
                >
                  {item}
                </Pagination.Item>
              ))}
              <Pagination.Next
                onClick={() => {
                  if (page < paginate.length) {
                    setPage((last) => last + 1);
                  }
                }}
              />
              <Pagination.Last onClick={() => setPage(paginate.length)} />
            </Pagination>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
