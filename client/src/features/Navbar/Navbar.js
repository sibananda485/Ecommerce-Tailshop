import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import { Link, useLocation } from "react-router-dom";
import { selectCartItems } from "../Cart/CartSlice";
import { useDispatch, useSelector } from "react-redux";
import { logOutAsync, logOutRed } from "../Auth/authSlice";
import {
  logOutUserInfoRed,
  selectUserInfo,
  selectUserInfoLoading,
} from "../user/userSlice";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const location = useLocation();
  const user = useSelector(selectUserInfo);

  const loading = true;
  const dispatch = useDispatch();

  const toggleMenu = () => {
    if (
      document
        .getElementById("mobile-menu")
        .classList.contains("left-[-100rem]")
    ) {
      document.getElementById("mobile-menu").classList.remove("left-[-100rem]");
      document.getElementById("mobile-menu").classList.add("left-0");
    } else {
      document.getElementById("mobile-menu").classList.remove("left-0");
      document.getElementById("mobile-menu").classList.add("left-[-100rem]");
    }
  };
  const removeCookie = (cookieName) => {
    // Set the cookie's expiration date to a past date
    document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  };
  const cartItems = useSelector(selectCartItems);
  const totalItem = cartItems.reduce(
    (amount, value) => amount + value.quantity,
    0
  );
  const navigation = !user
    ? [
        {
          show: true,
          name: "Home",
          href: "/",
          current: true,
        },
        {
          show: true,
          name: "Login",
          href: "/login",
          current: false,
        },
        {
          show: true,
          name: "About",
          href: "/about",
          current: false,
        },
      ]
    : [
        {
          show: true,
          name: "Home",
          href: user?.role ? (user?.role === "admin" ? "/admin" : "/") : "/",
          current: true,
        },
        {
          show: user?.role === "user" && true,
          name: "Cart",
          href: "/cart",
          current: false,
        },
        {
          show: user?.role === "user" && true,
          name: "Order",
          href: "/orders",
          current: false,
        },
        {
          show: user?.role === "admin" && true,
          name: "Order",
          href: "/admin/orders",
          current: false,
        },
        { show: true, name: "Profile", href: "/profile", current: false },
        {
          show: true,
          name: "About",
          href: "/about",
          current: false,
        },
      ];
  return (
    <>
      {/* For Desktop */}
      <div className="bg-cyan-700">
        <nav className="max-w-7xl mx-auto flex items-center justify-between px-2 py-3 lg:px-5 lg:py-3">
          <ul className="flex items-center gap-3">
            <Link
              to="/"
              className="text-xs sm:tracking-widest flex items-center mr-5 text-white"
            >
              <p className="text-xl font-semibold lg:text-2xl">TailShop</p>
            </Link>
            {navigation.map((data) => {
              return (
                data.show && (
                  <Link
                    to={data.href}
                    className={`hidden  lg:block cursor-pointer transition-colors ${
                      location.pathname === `${data.href}`
                        ? "text-[#a0fffd]"
                        : "text-white"

                      // location.pathname === `${data.href}` && "text-[#a0fffd]"
                    }`}
                  >
                    {data.name}
                  </Link>
                )
              );
            })}
          </ul>
          {/* Profile Icon and Cart */}

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 sm:static">
              <Link to="/cart">
                <button
                  type="button"
                  className="relative rounded-full p-1 text-white hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 flex"
                >
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">View notifications</span>
                  {cartItems.length > 0 && (
                    <p className="flex text-xs font-bold items-center justify-center border rounded-full w-5 h-5">
                      {totalItem}
                    </p>
                  )}
                  <ShoppingCartIcon
                    className="h-7 w-7 inline-block"
                    aria-hidden="true"
                  />
                </button>
              </Link>

              <Menu as="div" className="relative">
                <div>
                  <Menu.Button className="relative flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                    <span className="absolute -inset-1.5" />
                    <span className="sr-only">Open user menu</span>

                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="white"
                      className="w-7 h-7 bg-cyan-700"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
                        clipRule="evenodd"
                      />
                    </svg>
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
                  <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          to="/profile"
                          className={classNames(
                            active ? "bg-gray-100" : "",
                            "block px-4 py-2 text-sm text-gray-700"
                          )}
                        >
                          My Profile
                        </Link>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          to="/orders"
                          className={classNames(
                            active ? "bg-gray-100" : "",
                            "block px-4 py-2 text-sm text-gray-700"
                          )}
                        >
                          Orders
                        </Link>
                      )}
                    </Menu.Item>
                    {!user ? (
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            // onClick={() => {
                            //   removeCookie("token");
                            //   dispatch(logOutAsync());
                            //   dispatch(logOutRed());
                            //   dispatch(logOutUserInfoRed());
                            // }}
                            to="/login"
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700"
                            )}
                          >
                            Log in
                          </Link>
                        )}
                      </Menu.Item>
                    ) : (
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            onClick={() => {
                              removeCookie("token");
                              dispatch(logOutAsync());
                              dispatch(logOutRed());
                              dispatch(logOutUserInfoRed());
                            }}
                            to="/login"
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700"
                            )}
                          >
                            Log out
                          </Link>
                        )}
                      </Menu.Item>
                    )}
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
            <svg
              onClick={toggleMenu}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="white"
              className="w-7 h-7 lg:hidden"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5M12 17.25h8.25"
              />
            </svg>
          </div>
        </nav>
      </div>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        className="bg-[#0000003e] z-50 left-[-100rem] transition-all duration-500 lg:hidden absolute top-0 w-screen h-screen"
      >
        <ul
          id="mobile-menu-item"
          className=" bg-cyan-700 text-white w-fit relative overflow-hidden min-h-full py-3 "
        >
          <li className="flex items-center gap-14 pr-5 ps-2 pb-5">
            <div className="flex items-center">
              <Link
                to="/"
                className="text-xs sm:tracking-widest flex items-center mr-5 text-white"
              >
                <p className="text-xl font-semibold lg:text-2xl">TailShop</p>
              </Link>
            </div>
            <svg
              onClick={toggleMenu}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-8 h-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </li>
          {navigation.map((data) => {
            return (
              data.show && (
                <Link
                  to={data.href}
                  className={`px-4 block text-base py-2 ${
                    location.pathname === `${data.href}` &&
                    "text-[#a0fffd] bg-[#ffffff1a]"
                  } `}
                >
                  {data.name}
                </Link>
              )
            );
          })}
        </ul>
      </div>
    </>
  );
}
