import { React, Fragment, useEffect } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { Link, useNavigate } from "react-router-dom";
import imgCart from "./images/Shopping.png";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { getProfile } from "../../redux/action";

const Header = () => {
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  const { data } = useSelector((state) => state.profile);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProfile());
  }, [localStorage.getItem("Token")]);

  const classNames = (...classes) => {
    return classes.filter(Boolean).join(" ");
  };

  // for loop to calculate total quantity
  let quantity = 0;
  for (let i = 0; i < cart.cart.length; i++) {
    quantity += cart.cart[i].quantity;
  }
  // _____________________________________________
  return (
    <header className="bg-blue-500">
      <div className=" mx-10 content-center">
        <div className="flex justify-between">
          <div>
            <div className="py-3">
              <Link to={"/"} className="text-5xl text-white	no-underline">
                Home
              </Link>
            </div>
          </div>

          <div className="flex">
            <div className="py-3"></div>
            {data.success && (
              <div className="mt-3 ">
                <img
                  src={data.user?.image}
                  className="w-14 h-14 rounded-full"
                ></img>
              </div>
            )}
            <div
              className="font-sans mr-8 block lg:inline-block align-middle text-black hover:text-gray-700 relative flex w-14 h-16  text-5xl"
              onClick={() => navigate("/cart")}
            >
              <div class="font-sans block mt-4 lg:inline-block lg:mt-0 lg:ml-8 align-middle text-black hover:text-gray-700 ml-8">
                <Link
                  to={"/cart"}
                  role="button"
                  className="relative flex w-16 h-16"
                >
                  <img
                    className="flex-1 w-10 h-10 fill-current relative flex mr-8"
                    src={imgCart}
                  />

                  <span className="absolute right-0 top-0 rounded-full bg-red-600 w-8 h-8 top right p-0 m-0 text-white font-mono text-sm  leading-tight text-center pt-2 text-5lg">
                    {quantity}
                  </span>
                </Link>
              </div>
            </div>

            {data.success ? (
              <div className="py-4 ml-8">
                <Menu as="div" className="relative inline-block text-left">
                  <div>
                    <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                      Email
                      <ChevronDownIcon
                        className="-mr-1 h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </Menu.Button>
                  </div>

                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div className="py-1">
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              to="/profile"
                              className={classNames(
                                active
                                  ? "bg-gray-100 text-gray-900"
                                  : "text-gray-700",
                                "block px-4 py-2 text-sm"
                              )}
                            >
                              Profile
                            </Link>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              to="/orders"
                              className={classNames(
                                active
                                  ? "bg-gray-100 text-gray-900"
                                  : "text-gray-700",
                                "block px-4 py-2 text-sm"
                              )}
                            >
                              Order
                            </Link>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              to="/setting"
                              className={classNames(
                                active
                                  ? "bg-gray-100 text-gray-900"
                                  : "text-gray-700",
                                "block px-4 py-2 text-sm"
                              )}
                            >
                              Setting
                            </Link>
                          )}
                        </Menu.Item>
                        <form>
                          <Menu.Item>
                            {({ active }) => (
                              <button
                                onClick={() => {
                                  localStorage.removeItem("Token");
                                  localStorage.removeItem("user");
                                  navigate("/");
                                  toast("logged out", {
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
                                }}
                                type="button"
                                className={classNames(
                                  active
                                    ? "bg-gray-100 text-gray-900"
                                    : "text-gray-700",
                                  "block w-full px-4 py-2 text-left text-sm"
                                )}
                              >
                                Log out
                              </button>
                            )}
                          </Menu.Item>
                        </form>
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            ) : (
              <div className="py-4 ml-8">
                <Link to={"/login"} className="text-4xl text-white	no-underline">
                  Login
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
export default Header;