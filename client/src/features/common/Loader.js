import React from "react";
import Logo from "../../assets/Logo2.png";

export default function Loader() {
  return (
    <>
      <div className="h-[90vh] w-screen flex justify-center items-center">
        <div className="flex flex-col gap-9 justify-center items-center">
          <img className="w-52 " src={Logo} alt="" />
          <div className="loader"></div>
          <div className="text-xl">Please wait...</div>
        </div>
      </div>
    </>
  );
}
