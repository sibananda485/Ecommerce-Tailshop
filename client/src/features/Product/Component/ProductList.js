import React, { useEffect } from "react";
import Pagination from "../../common/Pagination";
import { useSelector, useDispatch } from "react-redux";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import {
  fetchProductByFilterAsync,
  fetchBrandsAsync,
  fetchCategoriesAsync,
  getBrands,
  getCategories,
  getProducts,
  getTotalResult,
  getProductStatus,
} from "../ProductSlice";
import { Fragment, useState } from "react";
import { Dialog, Disclosure, Menu, Transition } from "@headlessui/react";
import { XMarkIcon, StarIcon } from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  FunnelIcon,
  MinusIcon,
  PlusIcon,
  Squares2X2Icon,
} from "@heroicons/react/20/solid";
import Loader from "../../common/Loader";

import { Link } from "react-router-dom";
import { ITEM_PER_PAGE } from "../../../app/constant";

const sortOptions = [
  { name: "Best Rating", type: "rating", order: "desc", current: false },
  { name: "Price: Low to High", type: "price", order: "asc", current: false },
  { name: "Price: High to Low", type: "price", order: "desc", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export function ProductList() {
  window.scroll(0, 0);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [filterObj, setFilterObj] = useState({
    _page: 1,
    _limit: ITEM_PER_PAGE,
  });
  const products = useSelector(getProducts);
  const brands = useSelector(getBrands);
  const categories = useSelector(getCategories);
  const totalResult = useSelector(getTotalResult);
  const status = useSelector(getProductStatus);
  const dispatch = useDispatch();
  const filters = [
    {
      id: "category",
      name: "Category",
      options: categories,
    },
    {
      id: "brand",
      name: "brand",
      options: brands,
    },
  ];

  const handleFilter = (type, value, e) => {
    if (e.target.checked) {
      let temp = { ...filterObj, _page: 1 };
      if (temp[type]) {
        temp[type].push(value);
      } else {
        temp[type] = [value];
      }
      setFilterObj(temp);
    } else {
      let k = { ...filterObj, _page: 1 };
      k[type] = k[type].filter((el) => {
        return el !== value;
      });
      setFilterObj(k);
    }
  };
  const handleSort = (sortOptions) => {
    dispatch(
      fetchProductByFilterAsync({
        ...filterObj,
        _sort: sortOptions.type,
        _order: sortOptions.order,
      })
    );
  };
  const handlePage = (pageNumber) => {
    setFilterObj({ ...filterObj, _page: pageNumber });
  };
  useEffect(() => {
    dispatch(fetchProductByFilterAsync(filterObj));
  }, [dispatch, filterObj]);
  useEffect(() => {
    dispatch(fetchBrandsAsync());
    dispatch(fetchCategoriesAsync());
  }, [dispatch]);

  return (
    <>
      <div className="bg-white">
        <div>
          {/* Mobile filter dialog */}
          <MobileFilter
            mobileFiltersOpen={mobileFiltersOpen}
            setMobileFiltersOpen={setMobileFiltersOpen}
            handleFilter={handleFilter}
            filters={filters}
          ></MobileFilter>

          <main className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-10">
              <h1 className="text-lg md:text-4xl font-semibold tracking-tight text-gray-900">
                All Products
              </h1>

              <div className="flex items-center">
                <Menu as="div" className="relative inline-block text-left">
                  <div>
                    <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                      Sort
                      <ChevronDownIcon
                        className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
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
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div className="py-1">
                        {sortOptions.map((option) => (
                          <Menu.Item key={option.name}>
                            {({ active }) => (
                              <p
                                onClick={() => handleSort(option)}
                                className={classNames(
                                  option.current
                                    ? "font-medium text-gray-900"
                                    : "text-gray-500",
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm"
                                )}
                              >
                                {option.name}
                              </p>
                            )}
                          </Menu.Item>
                        ))}
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>

                {/* <button
                  type="button"
                  className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7"
                >
                  <span className="sr-only">View grid</span>
                  <Squares2X2Icon className="h-5 w-5" aria-hidden="true" />
                </button> */}
                <button
                  type="button"
                  className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                  onClick={() => setMobileFiltersOpen(true)}
                >
                  <span className="sr-only">Filters</span>
                  <FunnelIcon className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>
            </div>

            <section aria-labelledby="products-heading" className="pb-24 pt-6">
              <h2 id="products-heading" className="sr-only">
                Products
              </h2>

              <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
                {/* Filters */}

                <DesktopFilter
                  mobileFiltersOpen={mobileFiltersOpen}
                  setMobileFiltersOpen={setMobileFiltersOpen}
                  handleFilter={handleFilter}
                  filters={filters}
                ></DesktopFilter>

                {/* Product grid */}
                <div className="lg:col-span-3">
                  {/* Your content */}
                  {/* <Loader></Loader> */}

                  {/* <Skeleton count={5} */}
                  <ProductGrid
                    products={products}
                    status={status}
                  ></ProductGrid>
                </div>
              </div>
            </section>

            {/* Pagination  */}
            <Pagination
              totalResult={totalResult}
              filterObj={filterObj}
              handlePage={handlePage}
            ></Pagination>
          </main>
        </div>
      </div>
    </>
  );
}

const MobileFilter = ({
  mobileFiltersOpen,
  setMobileFiltersOpen,
  handleFilter,
  filters,
}) => {
  return (
    <>
      <Transition.Root show={mobileFiltersOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-40 lg:hidden"
          onClose={setMobileFiltersOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 z-40 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                <div className="flex items-center justify-between px-4">
                  <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                  <button
                    type="button"
                    className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                    onClick={() => setMobileFiltersOpen(false)}
                  >
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                {/* Filters */}
                <form className="mt-4 border-t border-gray-200">
                  {filters.map((section, index) => (
                    <Disclosure
                      as="div"
                      key={index}
                      className="border-t border-gray-200 px-4 py-6"
                    >
                      {({ open }) => (
                        <>
                          <h3 className="-mx-2 -my-3 flow-root">
                            <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                              <span className="font-medium text-gray-900">
                                {section.name}
                              </span>
                              <span className="ml-6 flex items-center">
                                {open ? (
                                  <MinusIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                ) : (
                                  <PlusIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                )}
                              </span>
                            </Disclosure.Button>
                          </h3>
                          <Disclosure.Panel className="pt-6">
                            <div className="space-y-6">
                              {section.options.map((option, optionIdx) => (
                                <div
                                  key={option.value}
                                  className="flex items-center"
                                >
                                  <input
                                    id={`filter-mobile-${section.id}-${optionIdx}`}
                                    name={`${section.id}[]`}
                                    defaultValue={option.value}
                                    type="checkbox"
                                    defaultChecked={option.checked}
                                    onChange={(e) =>
                                      handleFilter(section.id, option.value, e)
                                    }
                                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                  />
                                  <label
                                    htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                    className="ml-3 min-w-0 flex-1 text-gray-500"
                                  >
                                    {option.label}
                                  </label>
                                </div>
                              ))}
                            </div>
                          </Disclosure.Panel>
                        </>
                      )}
                    </Disclosure>
                  ))}
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
};

const DesktopFilter = ({ handleFilter, filters }) => {
  return (
    <>
      <form className="hidden lg:block">
        {filters.map((section) => (
          <Disclosure
            as="div"
            key={section.id}
            className="border-b border-gray-200 py-6"
          >
            {({ open }) => (
              <>
                <h3 className="-my-3 flow-root">
                  <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                    <span className="font-medium text-gray-900">
                      {section.name}
                    </span>
                    <span className="ml-6 flex items-center">
                      {open ? (
                        <MinusIcon className="h-5 w-5" aria-hidden="true" />
                      ) : (
                        <PlusIcon className="h-5 w-5" aria-hidden="true" />
                      )}
                    </span>
                  </Disclosure.Button>
                </h3>
                <Disclosure.Panel className="pt-6">
                  <div className="space-y-4">
                    {section.options.map((option, optionIdx) => (
                      <div key={option.value} className="flex items-center">
                        <input
                          id={`filter-${section.id}-${optionIdx}`}
                          name={`${section.id}[]`}
                          defaultValue={option.value}
                          type="checkbox"
                          onChange={(e) =>
                            handleFilter(section.id, option.value, e)
                          }
                          defaultChecked={option.checked}
                          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        />
                        <label
                          htmlFor={`filter-${section.id}-${optionIdx}`}
                          className="ml-3 text-sm text-gray-600"
                        >
                          {option.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        ))}
      </form>
    </>
  );
};

const ProductGrid = ({ products, status }) => {
  return (
    <>
      <div className="mx-auto max-w-2xl sm:px-6 sm:py-0 lg:max-w-7xl lg:px-8">
        <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {status === "loading" &&
            Array(51, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1).map((product) => {
              return (
                <>
                  <Link
                    key={product.id}
                    to={`/productdetail/${product?.id}`}
                    className="bg-white"
                  >
                    <div className="group relative">
                      <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md lg:aspect-none group-hover:opacity-75 lg:h-60">
                        {/* <img
                          src={product?.thumbnail}
                          alt={product?.title}
                          className="h-full w-full object-contain lg:h-full lg:w-full"
                        /> */}
                        <Skeleton className="h-full w-full object-contain lg:h-full lg:w-full"></Skeleton>
                      </div>
                     
                      <Skeleton className="w-1/2"></Skeleton>
                      <Skeleton></Skeleton>
                      <div className="mt-4 flex justify-between">
                        <div>
                          <h3 className="text-sm text-gray-700">
                            <p href={product?.thumbnail}>
                              <span
                                aria-hidden="true"
                                className="absolute inset-0"
                              />
                              <p className="line-clamp-1">
                                {product?.title || <Skeleton></Skeleton>}
                              </p>
                            </p>

                          </h3>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            <Skeleton></Skeleton>
                          </p>
                          <p className="text-sm line-through font-medium text-gray-500">
                            {product?.price || <Skeleton></Skeleton>}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Link>
                </>
              );
            })}
          {products.map((product) => (
            <Link
              key={product.id}
              to={`/productdetail/${product.id}`}
              className="bg-white"
            >
              <div className="group relative">
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md lg:aspect-none group-hover:opacity-75 lg:h-60">
                  {status === "loading" && <Skeleton />}

                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="h-full w-full object-contain lg:h-full lg:w-full"
                  />
                </div>
                <div className="mt-4 flex justify-between">
                  <div>
                    <h3 className="text-sm text-gray-700">
                      <p href={product.thumbnail}>
                        <span aria-hidden="true" className="absolute inset-0" />
                        <p className="line-clamp-1">{product.title}</p>
                        {product.stock <= 0 && (
                          <span className="text-red-500"> (OUT OF STOCK)</span>
                        )}
                      </p>
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      <StarIcon
                        className="h-5 w-5 my-auto inline-block"
                        stroke="green"
                        fill="green"
                      />
                      <span className="my-auto align-middle ms-1">
                        {product.rating}
                      </span>
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      ₹
                      {Math.round(
                        product.price -
                          product.price * (product.discountPercentage / 100)
                      )}
                    </p>
                    <p className="text-sm line-through font-medium text-gray-500">
                      ₹{product.price}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};
