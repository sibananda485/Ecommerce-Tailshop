import Navbar from "../features/Navbar/Navbar";
import { Link, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteCartItemAsync,
  selectCartItems,
  updateCartAsync,
} from "../features/Cart/CartSlice";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { updateUserAsync } from "../features/user/userSlice";
import {
  addOrderAsync,
  selectCurrentOrder,
} from "../features/order/orderSlice";
import { selectUserInfo } from "../features/user/userSlice";
import { toast } from "react-hot-toast";

export default function CheckOut() {
  const {
    register,
    handleSubmit,
    // watch,
    reset,
    // formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const [address, setAddress] = useState(null);
  const [payment, setPayment] = useState("cash");
  const cartItems = useSelector(selectCartItems);
  const user = useSelector(selectUserInfo);
  const currentOrder = useSelector(selectCurrentOrder);
  const totalPrice = cartItems.reduce(
    (amount, value) => amount + value.product.price * value.quantity,
    0
  );
  const totalItem = cartItems.reduce(
    (amount, value) => amount + value.quantity,
    0
  );

  const handleAddress = (data) => {
    setAddress(data);
  };

  const handlePayment = (e) => {
    setPayment(e.target.value);
  };

  const handleOrder = () => {

    console.log({
      user:user.id,
      address,
      payment,
      totalItem,
      totalPrice,
      items:cartItems,
      status: "pending",
    });
    if (address) {
      dispatch(
        addOrderAsync({
          address,
          payment,
          totalItem,
          totalPrice,
          items:cartItems,
          status: "pending",
        })
      );
    } else {
      toast.error("Choose an address")
    }
  };

  const handleQuantityChange = (product, e) => {
    dispatch(
      updateCartAsync({ id: product.id, data: { quantity: +e.target.value } })
    );
  };

  const handleRemove = (id) => {
    dispatch(deleteCartItemAsync(id));
    toast('Item removed', {
      icon: '⛔',
    });
  };

  return (
    <>
      {currentOrder && (
        <Navigate to={`/orderplaced/${currentOrder.id}`}></Navigate>
      )}
      <Navbar></Navbar>
      <div className="mx-auto max-w-7xl py-10 px-4 sm:px-6 lg:px-0">
        <div className=" sm:px-16 md:mx-0 lg:grid grid-cols-12 gap-5 h-full bg-white">
          <form
            className="col-span-7"
            onSubmit={handleSubmit((data) => {
              const update = {address: [...user.address, data] };
              dispatch(updateUserAsync(update));
              toast.success('Address added')
              reset();
            })}
          >
            <div className="space-y-12 ">
              <div className="border-b border-gray-900/10 pb-12">
                <h2 className="text-2xl font-semibold leading-7 text-gray-900">
                  Personal Information
                </h2>
                <p className="mt-1 text-sm leading-6 text-gray-600">
                  Use a permanent address where you can receive mail.
                </p>

                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Full name
                    </label>
                    <div className="mt-2">
                      <input
                        {...register("name", { required: true })}
                        type="text"
                        // name="naame"
                        id="name"
                        autoComplete="given-name"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-4">
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Email address
                    </label>
                    <div className="mt-2">
                      <input
                        {...register("email", { required: true })}
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-4">
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Phone
                    </label>
                    <div className="mt-2">
                      <input
                        {...register("phone", { required: true })}
                        id="phone"
                        name="phone"
                        type="tel"
                        autoComplete="phone"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="col-span-full">
                    <label
                      htmlFor="street"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Street address
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        {...register("street", { required: true })}
                        name="street"
                        id="street"
                        autoComplete="street"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2 sm:col-start-1">
                    <label
                      htmlFor="city"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      City
                    </label>
                    <div className="mt-2">
                      <input
                        {...register("city", { required: true })}
                        type="text"
                        name="city"
                        id="city"
                        autoComplete="address-level2"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label
                      htmlFor="state"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      State / Province
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        name="state"
                        {...register("state", { required: true })}
                        id="state"
                        autoComplete="address-level1"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label
                      htmlFor="pinCode"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      ZIP / Postal code
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        name="pinCode"
                        {...register("pinCode", { required: true })}
                        id="pinCode"
                        autoComplete="postal-code"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-6 flex items-center justify-end gap-x-6">
                <button
                  onClick={() => reset()}
                  type="button"
                  className="text-sm bg-green-100 border border-green-500 hover:bg-white rounded-md px-3 py-1 font-semibold leading-6 text-green-900"
                >
                  Reset
                </button>
                <button
                  type="submit"
                  className="rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
                >
                  Add address
                </button>
              </div>
              <div className="border-b border-gray-900/10 pb-12">
                <h2 className="text-base font-semibold leading-7 text-gray-900">
                  Address
                </h2>
                <p className="mt-1 mb-6 text-sm leading-6 text-gray-600">
                  Choose from existing Address
                </p>

                {user&&<ul>
                  {user.address.map((add, i) => (
                    <li
                      key={i}
                      className="flex justify-between gap-x-6 p-5 mb-3 rounded border"
                    >
                      <div className="flex min-w-0 gap-x-4">
                        <input
                          onChange={() => handleAddress(add)}
                          id="address"
                          name="address"
                          type="radio"
                          className="h-4 w-4 my-auto border-gray-300 text-cyan-600 focus:ring-cyan-600"
                        />
                        <div className="min-w-0 flex-auto">
                          <p className="text-sm font-semibold leading-6 text-gray-900">
                            {add.name}
                          </p>
                          <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                            {add.email}
                          </p>
                          <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                            {add.phone}
                          </p>
                        </div>
                      </div>
                      <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                        <p className="text-sm leading-6 text-gray-900">
                          {add.street},{add.city}
                        </p>
                        <p className="text-sm leading-6 text-gray-900">
                          {add.state}
                        </p>
                        <p className="text-sm leading-6 text-gray-900">
                          {add.pinCode}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>}
                <div className="mt-10 space-y-10">
                  <fieldset>
                    <legend className="text-sm font-semibold leading-6 text-gray-900">
                      Payment methodes
                    </legend>
                    <p className="mt-1 text-sm leading-6 text-gray-600">
                      Choose One
                    </p>
                    <div className="mt-6 space-y-6">
                      <div className="flex items-center gap-x-3">
                        <input
                          onClick={handlePayment}
                          id="cash"
                          checked={payment === "cash" ? true : false}
                          name="paymentMethode"
                          value="cash"
                          type="radio"
                          className="h-4 w-4 border-gray-300 text-cyan-600 focus:ring-cyan-600"
                        />
                        <label
                          htmlFor="push-everything"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          COD (Cash on delivery)
                        </label>
                      </div>
                      <div className="flex items-center  gap-x-3">
                        <input
                        disabled={true}
                          id="card"
                          value="card"
                          onClick={handlePayment}
                          name="paymentMethode"
                          type="radio"
                          className="h-4 w-4 border-gray-300 text-cyan-600 focus:ring-cyan-600"
                        />
                        <label
                          htmlFor="card"
                          className="block text-sm font-medium leading-6 text-gray-400"
                        >
                          Card Payment ( Razorpay / Strapi payment  gatway comming soon)
                        </label>
                      </div>
                    </div>
                  </fieldset>
                </div>
              </div>
            </div>
          </form>
          {/* Cart component */}
          <div className="col-span-5">
            {cartItems.length !== 0 ? (
              <div className="max-w-2xl mx-auto ">
                <div className="flex h-full flex-col bg-white shadow-sm">
                  <div className="flex-1 overflow-y- px-4 pb-5 sm:px-6">
                    <div className="flex items-start justify-between">
                      <h1 className="text-3xl font-semibold tracking-tight text-gray-900">
                        Cart
                      </h1>
                    </div>

                    <div className="mt-8">
                      <div className="flow-root">
                        <ul className="-my-6 divide-y divide-gray-200">
                          {cartItems.map((value) => (
                            <li key={value.product.id} className="flex py-6">
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
                                    <h3>
                                      <Link
                                        to={`valuedetail/${value.product.id}`}
                                      >
                                        {value.product.title}
                                      </Link>
                                    </h3>
                                    <p className="ml-4">
                                      {value.product.price}
                                    </p>
                                  </div>
                                  <p className="mt-1 flex items-center text-sm text-gray-500">
                                    {value.product.color}
                                  </p>
                                </div>
                                <div className="flex flex-1 items-end justify-between text-sm">
                                  <p className="text-gray-500">
                                    Qty {value.quantity}
                                    <select
                                      onChange={(e) =>
                                        handleQuantityChange(value, e)
                                      }
                                      value={value.quantity}
                                      className="py-0 mx-3"
                                    >
                                      <option value="1">1</option>
                                      <option value="2">2</option>
                                      <option value="3">3</option>
                                    </select>
                                  </p>

                                  <div className="flex">
                                    <button
                                      onClick={() => handleRemove(value.id)}
                                      type="button"
                                      className="font-medium text-red-600 hover:text-red-500"
                                    >
                                      Remove
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                    <div className="flex justify-between text-base font-medium text-gray-900">
                      <p>Subtotal</p>
                      <p>{totalPrice}</p>
                    </div>
                    <div className="flex justify-between text-base font-medium text-gray-900">
                      <p>Total Item</p>
                      <p>{totalItem}</p>
                    </div>
                    <p className="mt-0.5 text-sm text-gray-500">
                      Shipping and taxes calculated at checkout.
                    </p>
                    <div className="mt-6">
                      <Link
                        onClick={handleOrder}
                        to="/checkout"
                        className="flex items-center justify-center rounded-md border border-transparent bg-cyan-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-cyan-700"
                      >
                        Order now
                      </Link>
                    </div>
                    <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                      <p>
                        or
                        <Link className="text-cyan-600 font-semibold" to="/">
                          {" "}
                          Continue Shopping
                        </Link>
                        <span aria-hidden="true"> &rarr;</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <h1 className="text-3xl font-bold tracking-tight text-center my-10 text-gray-900">
                Cart is empty
              </h1>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
