import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrdersByUserIdAsync, selectOrders } from "../../order/orderSlice";
import { selectLoggedInUser } from "../../Auth/authSlice";
import { Link } from "react-router-dom";

export default function MyOrder() {
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);
  const orders = useSelector(selectOrders);
  useEffect(() => {
    dispatch(getOrdersByUserIdAsync());
  }, [dispatch, user.id]);
  return (
    <>
      {orders.length===0?<main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center">
          <p className="text-base font-semibold text-cyan-700"></p>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
            oh ! No orders yet 😢
          </h1>
          <p className="mt-6 text-base leading-7 text-gray-600">
            Sorry, we couldn’t find the page you’re looking for.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              to="/"
              className="rounded-md bg-cyan-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-cyan-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-700"
            >
              Order Now !
            </Link>
          </div>
        </div>
      </main>:<div className="max-w-2xl mx-auto mt-5 ">
        <div className="flex h-full flex-col bg-white shadow-sm">
          <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
            <div className="flex items-start justify-between">
              <h1 className="text-3xl font-semibold tracking-tight text-gray-900">
                My Order
              </h1>
              
            </div>

            <div className="mt-8">
              <div className="flow-root">
                <ul className="-my-6 divide-y divide-gray-200">
                  {orders.map((first) => {
                    return (
                      first.items && (
                        <div className="py-5 pb-8">
                          <div className="space-y-3 sm:space-y-0 sm:flex justify-between items-center">
                            <p className="mt-1 text-gray-500">
                              OrderID : {first.id} <br />
                              <span className="text-green-600 font-bold">{first.status}</span>
                            </p>
                            <p
                              type="button"
                              className="font-medium text-sm"
                            >
                              Total Price - {first.totalPrice} <br />
                              Total items - {first.totalItem}
                            </p>
                          </div>
                          {first.items?.map((value) => {
                            return (
                              <>
                                <li
                                  key={value.product.id}
                                  className="flex py-6"
                                >
                                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                    <img
                                      src={value.product.thumbnail}
                                      alt={value.product.title}
                                      className="h-full w-full object-cover object-center"
                                    />
                                  </div>

                                  <div className="ml-4 flex flex-1 flex-col">
                                    <div>
                                      <div className="flex justify-between text-base font-medium text-gray-900">
                                      
                                        <Link to={`/productdetail/${value.product.id}`}>
                                        {/* <Link to="/profile"> */}
                                        <h3>
                                          <p>{value.product.title}</p>
                                        </h3>
                                        </Link>
                                        <p className="ml-4">
                                          {value.product.price}
                                        </p>
                                      </div>
                                    </div>
                                    <div className="flex flex-1 items-end justify-between text-sm">
                                      <p className="text-gray-500">
                                        Qty {value.quantity}
                                      </p>
                                      <div className="flex"></div>
                                    </div>
                                  </div>
                                </li>
                              </>
                            );
                          })}
                        </div>
                      )
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>}
    </>
  );
}