import React, { useEffect, useState } from "react";
// import icons
import { BiSolidHide } from "react-icons/bi";
import { BiShow } from "react-icons/bi";
import { IoMdClose } from "react-icons/io";
import { useNavigate } from "react-router";
import { jwtDecode } from "jwt-decode";
import useLogin from "../Services/LoginService";

const LoginInfo = {
  userName: "",
  password: "",
};
function LoginForm({ hideform, user }) {
  const [formData, setFormData] = useState(LoginInfo);
  //const [lstrole, setRole] = useState('');
  // const [lstrole, setRole] = useState(null);
  const navigate = useNavigate();
  // handle show or hide password
  const [passwordstatus, showpassword] = useState(false);
  const handlepassword = () => {
    showpassword(!passwordstatus);
  };
  // verify usertype and password & id
  const [errormsg, setErrormsg] = useState(false);

  const { VerifyLogin } = useLogin();

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const Login = async (e) => {
    e.preventDefault();

    try {
      await VerifyLogin(formData);
    } catch (error) {
      console.error("Failed to fetch Students:", error);
      setErrormsg(true);
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-slate-900/60 z-50">
      <div className="container absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-bgColor rounded-lg mx-auto w-full max-w-[500px] px-4 py-16 sm:px-6 lg:px-8">
        <div
          className="absolute -top-4 -right-2 flex justify-end items-start text-2xl cursor-pointer hover:text-white hover:bg-red-500  bg-slate-100 rounded-full p-1 duration-200 "
          onClick={hideform}
        >
          <IoMdClose />
        </div>
        <div className="mx-auto ">
          <h1 className="text-center text-2xl font-bold text-textColor sm:text-3xl">
            Get started today
          </h1>

          <form
            onSubmit={Login}
            className="mb-0 mt-2 space-y-4 rounded-lg py-2  "
          >
            <div>
              <label htmlFor="email" className="sr-only">
                UserID
              </label>

              <div className="relative">
                <input
                  type="text"
                  required
                  value={formData.userName}
                  name="userName"
                  onChange={handleChange}
                  className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                  placeholder="Enter username"
                />

                <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="size-4 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                    />
                  </svg>
                </span>
              </div>
            </div>

            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>

              <div className="relative">
                <input
                  type={`${passwordstatus ? "text" : "password"}`}
                  required
                  value={formData.password}
                  name="password"
                  onChange={handleChange}
                  className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                  placeholder="Enter password"
                />
                <span className="absolute inset-y-0 end-0 text-xl grid place-content-center px-4 text-gray-400 cursor-pointer duration-200  hover:text-black">
                  {!passwordstatus ? (
                    <BiSolidHide onClick={handlepassword} />
                  ) : (
                    <BiShow onClick={handlepassword} />
                  )}
                </span>
              </div>
              {errormsg && (
                <p className="text-red-600 animate-pulse py-2">
                  It looks like userId or password isn't correct, try again
                </p>
              )}
            </div>

            <button
              type="submit"
              className="block w-full rounded-lg bg-SecondaryButtonColor hover:bg-PrimaryButtonColor px-5 py-3 text-sm font-medium text-white outline-none"
            >
              Log in
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
