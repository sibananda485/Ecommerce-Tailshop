import React, { useEffect, useState } from "react";
import Pagination from "../../common/Pagination";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllOrderAsync,
  selectOrders,
  selectTotalResult,
  updateOrderAsync,
} from "../../order/orderSlice";
import { ITEM_PER_PAGE } from "../../../app/constant";
import { EyeIcon, PencilIcon } from "@heroicons/react/20/solid";

export default function AdminOrders() {
  const [sortObj, setSortObj] = useState({ field: "_id", type: "asc" });
  const [editIndex, setEditIndex] = useState(-1);
  const dispatch = useDispatch();
  const [filterObj, setFilterObj] = useState({
    _page: 1,
    _limit: ITEM_PER_PAGE,
  });
  const orders = useSelector(selectOrders);
  const totalResult = useSelector(selectTotalResult);
  const handlePage = (pageNumber) => {
    setFilterObj({ ...filterObj, _page: pageNumber });
  };

  const handleEdit = (index) => {
    if (editIndex === -1) setEditIndex(index);
    else setEditIndex(-1);
  };

  const handleChange = (e, id) => {
    const temp = { ...orders[editIndex], status: e.target.value };
    dispatch(updateOrderAsync({id:orders[editIndex].id,data:{status:e.target.value}}));
    setEditIndex(-1);
  };

  const handleSelectChange = (e) => {
    setSortObj({ ...sortObj, [e.target.name]: e.target.value });
  };

  const chooseColor = (status) => {
    switch (status) {
      case "pending":
        return "orange";
      case "cancelled":
        return "red";
      case "dispatched":
        return "green";
      case "delivered":
        return "cyan";
      default:
        return "cyan";
    }
  };

  useEffect(() => {
    setFilterObj({ ...filterObj, _sort: sortObj.field, _order: sortObj.type });
  }, [sortObj]);

  useEffect(() => {
    dispatch(getAllOrderAsync(filterObj));
  }, [filterObj, dispatch]);
  return (
    <>
      {/* component */}
      <div className="max-w-7xl mx-auto">
        <div className="container mx-auto px-4 sm:px-8">
          <div className="py-8">
            <div>
              <h2 className="text-2xl font-semibold leading-tight">Orders</h2>
            </div>
            <div className="my-2 flex sm:flex-row flex-col">
              <div className="flex flex-row mb-1 sm:mb-0">
                <div className="relative">
                  <select
                    onChange={(e) => handleSelectChange(e)}
                    value={sortObj.field}
                    name="field"
                    className="h-full rounded-l border block appearance-none w-full bg-white border-gray-400 text-gray-700 py-2 px-4 pr-8 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  >
                    <option value="_id">id</option>
                    <option value="totalPrice">price</option>
                  </select>
                </div>
                <div className="relative">
                  <select
                    value={sortObj.type}
                    onChange={(e) => handleSelectChange(e)}
                    name="type"
                    className="h-full rounded-r border-t border-r border-b block appearance-none w-full bg-white border-gray-400 text-gray-700 py-2 px-4 pr-8 leading-tight focus:outline-none focus:border-l focus:border-r focus:bg-white focus:border-gray-500"
                  >
                    <option value="asc">ascending</option>
                    <option value="desc">Descending</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
              <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                <table className="min-w-full leading-normal">
                  <thead>
                    <tr>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Id
                      </th>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        USER
                      </th>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Items
                      </th>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Address
                      </th>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        price(qt)
                      </th>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((first, index) => {
                      return (
                        first.items && (
                          <tr key={index}>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                              <p className="text-gray-900 whitespace-no-wrap">
                                {first.id}
                              </p>
                            </td>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                              <p className="text-gray-900 whitespace-no-wrap">
                                {first.user.email}
                              </p>
                            </td>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                              {first.items?.map((value) => {
                                return (
                                  <div className="flex items-center">
                                    <div className="flex-shrink-0 w-10 h-10">
                                      <img
                                        className="w-full h-full rounded-full"
                                        src={value.product.thumbnail}
                                        alt=""
                                      />
                                    </div>
                                    <div className="ml-3">
                                      <p className="text-gray-900 whitespace-no-wrap">
                                        {value.product.title}
                                      </p>
                                    </div>
                                  </div>
                                );
                              })}
                            </td>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                              <p className="text-gray-900 whitespace-no-wrap">
                                {first.address.name}
                              </p>
                              <p className="text-gray-900 whitespace-no-wrap">
                                {first.address.email}
                              </p>
                              <p className="text-gray-900 whitespace-no-wrap">
                                {first.address.phone}
                              </p>
                              <p className="text-gray-900 whitespace-no-wrap">
                                {first.address.state} - {first.address.pinCode}
                              </p>
                              <p className="text-gray-900 whitespace-no-wrap">
                                {first.address.street},{first.address.city}
                              </p>
                            </td>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                              <p className="text-gray-900 whitespace-no-wrap">
                                ₹{first.totalPrice} ({first.totalItem} Qt)
                              </p>
                            </td>

                            {editIndex === index ? (
                              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <select
                                  onChange={(e) => handleChange(e, first.id)}
                                  value={first.status}
                                  className="py-0 ps-0 pe-2"
                                  name="status"
                                >
                                  <option value="pending">Pending</option>
                                  <option value="cancelled">Cancelled</option>
                                  <option value="dispatched">Dispatched</option>
                                  <option value="delivered">Deliverd</option>
                                </select>
                              </td>
                            ) : (
                              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <span
                                  className={`relative inline-block px-3 py-1 font-semibold text-${chooseColor(
                                    first.status
                                  )}-900 leading-tight`}
                                >
                                  <span
                                    className={`absolute inset-0 bg-${chooseColor(
                                      first.status
                                    )}-200 opacity-50 rounded-full`}
                                  />
                                  <span className="relative">
                                    {first.status}
                                  </span>
                                </span>
                              </td>
                            )}
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                              <EyeIcon className="w-5 inline-block cursor-pointer text-gray-500"></EyeIcon>
                              <PencilIcon
                                onClick={() => handleEdit(index)}
                                className="w-5 inline-block ms-2 cursor-pointer text-gray-500"
                              ></PencilIcon>
                            </td>
                          </tr>
                        )
                      );
                    })}
                  </tbody>
                </table>
                <Pagination
                  totalResult={totalResult}
                  filterObj={filterObj}
                  handlePage={handlePage}
                ></Pagination>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
