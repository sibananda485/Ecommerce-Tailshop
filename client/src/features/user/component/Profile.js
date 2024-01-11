import React, { useEffect } from "react";
import { HomeIcon } from "@heroicons/react/20/solid";
import { useDispatch, useSelector } from "react-redux";
import { updateUserAsync } from "../../user/userSlice";
import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useForm } from "react-hook-form";
// import { selectUserInfo } from "../userSlice";
import { selectUserInfo } from "../../user/userSlice";
import { toast } from "react-hot-toast";

export default function Profile() {
  const {
    register,
    handleSubmit,
    // watch,
    setValue,
    reset,
    // formState: { errors },
  } = useForm();
  const [addressIndex, setAddressIndes] = useState(-1);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const cancelButtonRef = useRef(null);
  const user = useSelector(selectUserInfo);
  const handleAddAddress = () => {
    reset();
    setOpen(true);
  };
  const handleEdit = (index) => {
    setAddressIndes(index);
    setOpen(true);
    setValue("name", user.address[index].name);
    setValue("email", user.address[index].email);
    setValue("phone", user.address[index].phone);
    setValue("street", user.address[index].street);
    setValue("city", user.address[index].city);
    setValue("state", user.address[index].state);
    setValue("pinCode", user.address[index].pinCode);
  };
  useEffect(() => {
    if (!open) {
      setAddressIndes(-1);
    }
  }, [open]);
  return (
    <>
      {user && (
        <div>
          <Transition.Root show={open} as={Fragment}>
            <Dialog
              as="div"
              className="relative z-10"
              initialFocus={cancelButtonRef}
              onClose={setOpen}
            >
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="fixed inset-0 bg-black bg-opacity-75 transition-opacity" />
              </Transition.Child>

              <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    enterTo="opacity-100 translate-y-0 sm:scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                    leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                  >
                    <Dialog.Panel className="relative transform w-screen overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                      <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                        <div className="w-full">
                          <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                            <Dialog.Title
                              as="h3"
                              className="text-base font-semibold leading-6 text-gray-900"
                            >
                              Edit Address
                            </Dialog.Title>
                            <form
                              className="mt-5 grid grid-cols-1 gap-x-5 gap-y-2 sm:grid-cols-6"
                              onSubmit={handleSubmit((data) => {
                                if (addressIndex === -1) {
                                  const update = {
                                    // ...user,
                                    address: [...user.address, data],
                                  };
                                  dispatch(updateUserAsync(update));
                                  
                                  toast.success("Address added");
                                  setAddressIndes(-1);
                                } else {
                                  const temp = [...user.address];
                                  temp.splice(addressIndex, 1, data);
                                  const update = {
                                    address: [...temp],
                                  };
                                  dispatch(updateUserAsync(update));

                                  toast.success("Address updated");
                                  setAddressIndes(-1);
                                }
                                reset();
                              })}
                            >
                              <div className="sm:col-span-full">
                                <label
                                  htmlFor="name"
                                  className="block text-start text-sm font-medium leading-6 text-gray-900"
                                >
                                  Full name
                                </label>
                                <div className="mt-1">
                                  <input
                                    {...register("name", { required: true })}
                                    type="text"
                                    id="name"
                                    autoComplete="given-name"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                  />
                                </div>
                              </div>

                              <div className="sm:col-span-full">
                                <label
                                  htmlFor="email"
                                  className="block text-start text-sm font-medium leading-6 text-gray-900"
                                >
                                  Email address
                                </label>
                                <div className="mt-1">
                                  <input
                                    {...register("email", { required: true })}
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                  />
                                </div>
                              </div>

                              <div className="sm:col-span-full">
                                <label
                                  htmlFor="phone"
                                  className="block text-start text-sm font-medium leading-6 text-gray-900"
                                >
                                  Phone
                                </label>
                                <div className="mt-1">
                                  <input
                                    {...register("phone", { required: true })}
                                    id="phone"
                                    name="phone"
                                    type="tel"
                                    autoComplete="phone"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                  />
                                </div>
                              </div>

                              <div className="col-span-full">
                                <label
                                  htmlFor="street"
                                  className="block text-start text-sm font-medium leading-6 text-gray-900"
                                >
                                  Street address
                                </label>
                                <div className="mt-1">
                                  <input
                                    type="text"
                                    {...register("street", { required: true })}
                                    name="street"
                                    id="street"
                                    autoComplete="street"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                  />
                                </div>
                              </div>

                              <div className="sm:col-span-2 sm:col-start-1">
                                <label
                                  htmlFor="city"
                                  className="block text-start text-sm font-medium leading-6 text-gray-900"
                                >
                                  City
                                </label>
                                <div className="mt-1">
                                  <input
                                    {...register("city", { required: true })}
                                    type="text"
                                    name="city"
                                    id="city"
                                    autoComplete="address-level2"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                  />
                                </div>
                              </div>

                              <div className="sm:col-span-2">
                                <label
                                  htmlFor="state"
                                  className="block text-start text-sm font-medium leading-6 text-gray-900"
                                >
                                  State
                                </label>
                                <div className="mt-1">
                                  <input
                                    type="text"
                                    name="state"
                                    {...register("state", { required: true })}
                                    id="state"
                                    autoComplete="address-level1"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                  />
                                </div>
                              </div>

                              <div className="sm:col-span-2">
                                <label
                                  htmlFor="pinCode"
                                  className="block text-start text-sm font-medium leading-6 text-gray-900"
                                >
                                  ZIP / Postal code
                                </label>
                                <div className="mt-1">
                                  <input
                                    type="text"
                                    name="pinCode"
                                    {...register("pinCode", { required: true })}
                                    id="pinCode"
                                    autoComplete="postal-code"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                  />
                                </div>
                              </div>
                              <div className="bg-gray-50 p-3 col-span-full space-y-2 sm:flex justify-between">
                                <button
                                  type="button"
                                  className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                  onClick={() => {
                                    setOpen(false);
                                  }}
                                  ref={cancelButtonRef}
                                >
                                  Cancel
                                </button>
                                <button
                                  type="submit"
                                  className="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 sm:w-auto"
                                  onClick={() => setOpen(false)}
                                >
                                  {addressIndex === -1 ? "Add" : "Update"}
                                </button>
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </div>
            </Dialog>
          </Transition.Root>

          <div className="max-w-7xl mx-auto py-10 px-5">
            <div>
              <div className="px-4 sm:px-0">
                <h3 className="text-2xl font-semibold leading-7 text-gray-900">
                  User Details
                </h3>
                <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
                  Personal details and application.
                </p>
              </div>
              <div className="mt-6 border-t border-gray-100">
                <dl className="divide-y divide-gray-100">
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium leading-6 text-gray-900">
                      Full name
                    </dt>
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                      {user.name ? user.name : "Guest User"}
                    </dd>
                  </div>
                  {user.role === "admin" && (
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                      <dt className="text-sm font-medium leading-6 text-gray-900">
                        Role
                      </dt>
                      <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                        {user.role}
                      </dd>
                    </div>
                  )}
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium leading-6 text-gray-900">
                      Email
                    </dt>
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                      {user.email}
                    </dd>
                  </div>
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className=" text-sm font-medium leading-6 text-gray-900 ">
                      <div className="flex items-center justify-between gap-5">
                        <p>Addresses</p>
                        <p
                          onClick={handleAddAddress}
                          className="bg-green-100 h-fit rounded my-1 px-3 text-green-500 w-fit cursor-pointer"
                        >
                          Add
                        </p>
                      </div>
                    </dt>

                    <dd className="mt-2 t1xt-sm text-gray-900 sm:col-span-2 sm:mt-0">
                      <ul className="divide-y divide-gray-100 rounded-md border border-gray-200">
                        {user.address.map((data, index) => (
                          <div key={index}>
                            <li className="sm:flex items-center justify-between m-0 p-0 py-4 sm:pl-4 sm:pr-5 text-sm leading-">
                              <div className="sm:flex flex-1 items-center">
                                <HomeIcon
                                  className="ml-4 h-5 w-5 flex-shrink-0 text-cyan-600"
                                  aria-hidden="true"
                                />

                                <div className="ml-4 flex flex-col gap-0">
                                  <p className="flex-shrink- ">{data.name}</p>
                                  <span className="flex-shrink-0 text-gray-400">
                                    {data.email}
                                  </span>
                                  <span className="flex-shrink-0 text-gray-400">
                                    +91{data.phone}
                                  </span>
                                </div>
                              </div>
                              <div className="ml-4 flex-shrink-0">
                                <p
                                  href="#"
                                  className="font-medium text-indigo-600 hover:text-indigo-500"
                                >
                                  <p>
                                    {data.street},{data.city},{data.state}
                                  </p>
                                  <p>Pin - {data.pinCode}</p>
                                </p>
                              </div>
                            </li>
                            <div className="flex gap-5 justify-end pb-5 pr-5">
                              <button
                                onClick={() => handleEdit(index)}
                                type="button"
                                className="font-medium text-green-600 hover:text-green-500"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => {
                                  const temp = [...user.address];
                                  temp.splice(index, 1);
                                  const update = {
                                    address: [...temp],
                                  };
                                  dispatch(updateUserAsync(update));
                                  toast("Address Deleted", {
                                    icon: "⛔",
                                  });
                                }}
                                type="button"
                                className="font-medium text-red-600 hover:text-red-500"
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        ))}
                      </ul>
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
