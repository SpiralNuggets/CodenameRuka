import React from "react";

const register = () => {
  return (
    <div className="h-screen flex justify-center items-center">
      <div className="flex flex-col gap-y-8 items-center">
        <div>
          <h1 className="text-4xl text-white font-medium">Codename Ruka</h1>
        </div>
        <div className="w-64 sm:w-80 md:w-[30rem] bg-neutral-300 rounded-lg flex flex-col items-center px-6 pb-6 pt-2 gap-6">
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text text-black text-base">Email Address</span>
            </label>
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered bg-white !outline-neutral-500 shadow"
            />
            <label className="label">
              <span className="label-text text-black text-base">Password</span>
            </label>
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered bg-white !outline-neutral-500 shadow"
            />
            <label className="label">Confirm Password</label>
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered bg-white !outline-neutral-500 shadow"
            />
          </div>
          <button className="btn w-52 bg-[#28507d] hover:bg-[#1b2e49] border-2 text-white">
            Sign up
          </button>
        </div>
      </div>
    </div>
  );
};

export default register;
