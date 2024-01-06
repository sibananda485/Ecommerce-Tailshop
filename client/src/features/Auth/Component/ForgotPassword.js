import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { selectLoggedInUser, selectError } from "../authSlice";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const error = useSelector(selectError);
  const loggedInUser = useSelector(selectLoggedInUser);
  const submitFunction = (data) => {
    console.log(data);
  };

  return (
    <>
      {loggedInUser && <Navigate to="/"></Navigate>}
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py- lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          {/* <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=cyan&shade=600"
            alt="Your Company"
          /> */}
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Forgot Password
          </h2>
          <h2 className="text-center leading-9 tracking-tight text-red-700">
            {error}
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit(submitFunction)}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  // name="email"
                  type="email"
                  {...register("email", { required: true })}
                  autoComplete="email"
                  // required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6"
                />
                {errors.email && (
                  <p className="text-sm text-red-600">email is required</p>
                )}
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-cyan-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-cyan-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600"
              >
                Send Mail
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500 divide-x-2 divide-blue-600">
            <Link
              to="/login"
              className="font-semibold leading-6 text-cyan-600 hover:text-cyan-500 px-10"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="font-semibold leading-6 text-cyan-600 hover:text-cyan-500 px-10"
            >
              Signup
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
