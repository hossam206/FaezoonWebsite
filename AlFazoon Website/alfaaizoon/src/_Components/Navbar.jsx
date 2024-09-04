import React, { useEffect, useState } from "react";
import Buttons from "./Button";
import LoginForm from "./LoginForm";

function Navbar({ ButtonStatius }) {
  // to show and hide log in form
  const [loginForm, setLogin] = useState(false);
  const [user_type, setuser] = useState("");
  const handleLoginForm = (usertype) => {
    if (usertype === "User") {
      setuser("user");
    } else if (usertype === "admin") {
      setuser("admin");
    }
    setLogin(!loginForm);
  };
  return (
    <>
      <header className="bg-white shadow-sm">
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex-1 md:flex md:items-center md:gap-12">
              <a
                className="flex flex-row items-center  sm:justify-center gap-1"
                href="/"
              >
                <div className="w-12 h-12 object-cover overflow-hidden">
                  <img src="/images/logo.png" />
                </div>
                <span className="font-semibold text-PrimaryColor  md:text-xl text-sm ">
                  Al Faaizoon
                </span>
              </a>
            </div>
            {ButtonStatius && (
              <div className="md:flex md:items-center md:gap-12">
                <div className="flex items-center gap-2">
                  <Buttons action={() => handleLoginForm("User")}>
                    Register
                  </Buttons>
                  <Buttons
                    varient="primary"
                    action={() => handleLoginForm("admin")}
                  >
                    Login
                  </Buttons>
                </div>
              </div>
            )}
          </div>
        </div>
        {loginForm && (
          <div className="relative">
            <LoginForm hideform={handleLoginForm} user={user_type} />
          </div>
        )}
      </header>
    </>
  );
}

export default Navbar;
