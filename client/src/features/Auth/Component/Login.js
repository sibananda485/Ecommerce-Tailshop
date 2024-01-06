import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { selectLoggedInUser, checkUserAsync, selectError } from "../authSlice";
import Logo1 from "../../../assets/Logo1.png"
import Logo2 from "../../../assets/Logo2.png"

export default function Login() {
  const {
    register,
    handleSubmit,
    // watch,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const error = useSelector(selectError);
  const loggedInUser = useSelector(selectLoggedInUser);
  const submitFunction = (data) => {
    dispatch(checkUserAsync(data));
  };

  return (
    <>
      {loggedInUser ? (
        loggedInUser.role === "admin" ? (
          <Navigate to="/admin"></Navigate>
        ) : (
          <Navigate to="/"></Navigate>
        )
      ) : (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py- lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            {/* <img
              className="mx-auto h-10 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=cyan&shade=600"
              alt="Your Company"
            /> */}
            <h2 className="mt-10 text-center text-2xl font-semibold leading-9 tracking-tight text-gray-900">
              Log in to your account
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
                    
                    type="email"
                    {...register("email", { required: true })}
                    autoComplete="email"
                    
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6"
                  />
                  {errors.email && (
                    <p className="text-sm text-red-600">email is required</p>
                  )}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Password
                  </label>
                  <div className="text-sm">
                    <Link
                      to="/forgotpassword"
                      className="font-semibold text-red-600 hover:text-red-500"
                    >
                      Forgot password?
                    </Link>
                  </div>
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    
                    type="password"
                    {...register("password", { required: true })}
                    autoComplete="current-password"
                    
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6"
                  />
                  {errors.password && (
                    <p className="text-sm text-red-600">password is required</p>
                  )}
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-cyan-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-cyan-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600"
                >
                  Log in
                </button>
              </div>
            </form>

            <p className="mt-10 text-center text-sm text-gray-500">
              Not a member?{" "}
              <Link
                to="/signup"
                className="font-semibold leading-6 text-green-600 hover:text-green-500"
              >
                Craete a new account
              </Link>
            </p>
          </div>
        </div>
      )}
    </>
  );
}
