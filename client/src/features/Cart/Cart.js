import { useSelector, useDispatch } from "react-redux";
import {
  deleteCartItemAsync,
  selectCartItems,
  updateCartAsync,
} from "./CartSlice";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";

export function Cart() {
  const cartItems = useSelector(selectCartItems);
  const dispatch = useDispatch();
  const totalPrice = cartItems.reduce(
    (amount, value) => amount + value.product.price * value.quantity,
    0
  );
  const totalItem = cartItems.reduce(
    (amount, value) => amount + value.quantity,
    0
  );
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
      {cartItems.length !== 0 ? (
        <div className="max-w-2xl mx-auto mt-5 ">
          <div className="flex h-full flex-col bg-white shadow-sm">
            <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
              <div className="flex items-start justify-between">
                <h1 className="text-3xl font-semibold tracking-tight text-gray-900">
                  Cart
                </h1>
              </div>

              <div className="mt-8">
                <div className="flow-root">
                  <ul className="-my-6 divide-y divide-gray-200">
                    {cartItems.map((value, index) => (
                      <li key={index} className="flex py-6">
                        <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                          <img
                            src={value.product.thumbnail}
                            alt={value.product.title}
                            className="h-full w-full object-contain object-center"
                          />
                        </div>

                        <div className="ml-4 flex flex-1 flex-col">
                          <div>
                            <div className="flex justify-between text-base font-medium text-gray-900">
                              <h3>
                                <Link to={`productdetail/${value.product.id}`}>
                                  {value.product.title}
                                </Link>
                              </h3>
                              <p className="ml-4">{value.product.price}</p>
                            </div>
                            <p className="mt-1 flex items-center text-sm text-gray-500">
                              {value.product.color}
                            </p>
                          </div>
                          <div className="flex flex-1 items-end justify-between text-sm">
                            <p className="text-gray-500">
                              Qty {value.quantity}
                              <select
                                onChange={(e) => handleQuantityChange(value, e)}
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
                  to="/checkout"
                  className="flex items-center justify-center rounded-md border border-transparent bg-cyan-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-cyan-700"
                >
                  Checkout
                </Link>
              </div>
              <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                <p>
                  or{" "}
                  <button
                    type="button"
                    className="font-medium text-cyan-600 hover:text-cyan-500"
                  >
                    <Link to="/"> Continue Shopping</Link>
                    <span aria-hidden="true"> &rarr;</span>
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
          <div className="text-center">
            <p className="text-base font-semibold text-cyan-700"></p>
            <h1 className="mt-4 text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
              Oh ! Your Cart is Empty ☹️
            </h1>
            <p className="mt-6 text-base leading-7 text-gray-600">
              Sorry, we couldn’t find the page you’re looking for.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                to="/"
                className="rounded-md bg-cyan-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-cyan-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-700"
              >
                Add items now
              </Link>
            </div>
          </div>
        </main>
      )}
    </>
  );
}
