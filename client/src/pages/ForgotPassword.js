import React from "react";

const ForgotPassword = () => {
  return (
    <div className="mt-5">
      <div className="bg-white w-full max-w-sm mx-2 rounded overflow-hidden p-4 mx-auto">
        <h3>Reset Password</h3>
        <form
          className="grid gap-4 mt-5"
          // onSubmit={(e) => handleSubmit(e)}
        >
          <div className="flex flex-col gap-1">
            <label htmlFor="password">New Password : </label>
            <input
              required
              type="password"
              id="password"
              name="password"
              placeholder="Enter password"
              className="bg-slate-100 px-2 py-1 focus:outline-primary"
              // value={data.password}
              // onChange={(e) => handleOnChange(e)}
            ></input>
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="password">Confirm Password : </label>
            <input
              required
              type="password"
              id="password"
              name="password"
              placeholder="Enter password"
              className="bg-slate-100 px-2 py-1 focus:outline-primary"
              // value={data.password}
              // onChange={(e) => handleOnChange(e)}
            ></input>
          </div>

          <button className="bg-primary text-lg px-4 py-1 hover:bg-secondary rounded mt-2 font-bold text-white leading-relaxed tracking-wide">
            Reset
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
