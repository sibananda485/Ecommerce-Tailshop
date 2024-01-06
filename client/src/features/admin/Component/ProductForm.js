import react from "@heroicons/react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  addProductAsync,
  fetchProductByIdAsync,
  getBrands,
  getCategories,
  getSelectProduct,
  updateProductAsync,
} from "../../Product/ProductSlice";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ProductForm() {
  const para = useParams();
  const id = para.id;
  const brands = useSelector(getBrands);
  const categories = useSelector(getCategories);
  const productData = useSelector(getSelectProduct);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    // watch,
    setValue,
    reset,
    // formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    if (!id) {
      const temp = {
        ...data,
        rating: 0,
        images: [
          data["Image 1"],
          data["Image 2"],
          data["Image 3"],
          data["Image 4"],
        ],
      };
      delete temp["Image 1"];
      delete temp["Image 2"];
      delete temp["Image 3"];
      delete temp["Image 4"];
      dispatch(addProductAsync(temp));
    } else {
      const temp = {
        ...data,
        id: productData.id,
        rating: productData.rating,
        images: [
          data["Image 1"],
          data["Image 2"],
          data["Image 3"],
          data["Image 4"],
        ],
      };
      delete temp["Image 1"];
      delete temp["Image 2"];
      delete temp["Image 3"];
      delete temp["Image 4"];

      dispatch(updateProductAsync(temp));
    }

    reset();
  };
  const handleDelete = () => {
    dispatch(updateProductAsync({ ...productData, deleted: true }));
    reset();
  };
  useEffect(() => {
    if (id) {
      dispatch(fetchProductByIdAsync(id));
    } else {
      reset();
    }
  }, [id]);

  useEffect(() => {
    if (productData && id) {
      setValue("title", productData.title);
      setValue("description", productData.description);
      setValue("price", productData.price);
      setValue("discountPercentage", productData.discountPercentage);
      setValue("stock", productData.stock);
      setValue("brand", productData.brand);
      setValue("category", productData.category);
      setValue("thumbnail", productData.thumbnail);
      setValue("Image 1", productData.images[0]);
      setValue("Image 2", productData.images[1]);
      setValue("Image 3", productData.images[2]);
      setValue("Image 4", productData.images[3]);
    } else {
      reset();
    }
  }, [productData]);
  return (
    <div className="isolate bg-white px-6 py-10">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Product Form
        </h2>
      </div>
      <form className="mx-auto max-w-xl sm:mt-10">
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-4">
          <div className="col-span-2">
            <label
              htmlFor="title"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Title
            </label>
            <div className="mt-2.5">
              <input
                type="text"
                {...register("title", { required: true })}
                id="title"
                autoComplete="given-name"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div className="col-span-2">
            <label
              htmlFor="price"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              price
            </label>
            <div className="mt-2.5">
              <input
                type="text"
                {...register("price", { required: true })}
                id="price"
                autoComplete="family-name"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div className="col-span-2">
            <label
              htmlFor="discountPercentage"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              discountPercentage
            </label>
            <div className="mt-2.5">
              <input
                type="text"
                {...register("discountPercentage", { required: true })}
                id="discountPercentage"
                autoComplete="family-name"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div className="col-span-2">
            <label
              htmlFor="stock"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Stock
            </label>
            <div className="mt-2.5">
              <input
                type="text"
                {...register("stock", { required: true })}
                id="stock"
                autoComplete="family-name"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div className="col-span-2">
            <label
              htmlFor="brand"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              brand
            </label>
            <div className="mt-2.5">
              <select
                type="text"
                {...register("brand", { required: true })}
                id="brand"
                autoComplete="family-name"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              >
                {brands.map((data) => (
                  <option value={data.label}>{data.label}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="col-span-2">
            <label
              htmlFor="category"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              category
            </label>
            <div className="mt-2.5">
              <select
                type="text"
                {...register("category", { required: true })}
                id=""
                autoComplete="family-name"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              >
                {categories.map((data) => (
                  <option value={data.label}>{data.label}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="col-span-full">
            <label
              htmlFor="thumbnail"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Thumbanail
            </label>
            <div className="mt-2.5">
              <input
                type="text"
                {...register("thumbnail", { required: true })}
                id="thumbnail"
                autoComplete="family-name"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div className="col-span-2">
            <label
              htmlFor="Image 1"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Image 1
            </label>
            <div className="mt-2.5">
              <input
                type="text"
                {...register("Image 1", { required: true })}
                id="Image 1"
                autoComplete="family-name"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div className="col-span-2">
            <label
              htmlFor="Image 2"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Image 2
            </label>
            <div className="mt-2.5">
              <input
                type="text"
                {...register("Image 2", { required: true })}
                id="Image 2"
                autoComplete="family-name"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div className="col-span-2">
            <label
              htmlFor="Image 3"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Image 3
            </label>
            <div className="mt-2.5">
              <input
                type="text"
                {...register("Image 3", { required: true })}
                id="Image 3"
                autoComplete="family-name"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div className="col-span-2">
            <label
              htmlFor="Image 4"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Image 4
            </label>
            <div className="mt-2.5">
              <input
                type="text"
                {...register("Image 4", { required: true })}
                id="Image 4"
                autoComplete="family-name"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="sm:col-span-full">
            <label
              htmlFor="description"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Description
            </label>
            <div className="mt-2.5">
              <textarea
                {...register("description", { required: true })}
                id="description"
                rows={4}
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
        </div>
        <div className={`sm:grid ${id ? "grid-cols-2" : "grid-cols-1"} gap-5`}>
          {id && (
            <div className="mt-10">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  handleDelete();
                }}
                className="block w-full rounded-md bg-red-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Delete
              </button>
            </div>
          )}

          <div className="mt-10">
            <button
              onClick={(e) => {
                e.preventDefault();
                handleSubmit(onSubmit)();
              }}
              className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
