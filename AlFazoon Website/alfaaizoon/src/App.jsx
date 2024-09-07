import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Header from "./_Components/Header";
import Dashboard from "./_Components/Dashboard";
import UserPage from "./_Components/UserPage";

import { useEffect, useState } from "react";
import NotFind from "./_Components/NotFind";
import Protect_Routes from "./ProtectedRoutes/Protect_Routes";
import ProtectUser from "./ProtectedRoutes/ProtectUser";

function App() {
  // const Role = async () => {
  //   const token = await JSON.parse(localStorage.getItem("token")); // "token" is the key used when storing
  //   setUserRole(await token?.role);
  // };
  // // const [UserRole, setUserRole] = useState(null);
  // useEffect(() => {
  //   Role();
  // }, []);
  // const [UserRole, setUserRole] = useState(null);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Header />,
    },

    {
      path: "Dashboard",
      element: (
        <>
          <Protect_Routes>
            <Dashboard />
          </Protect_Routes>
        </>
      ),
    },

    {
      path: "UserPage",
      element: (
        <>
          <ProtectUser>
            <UserPage />
          </ProtectUser>
        </>
      ),
    },
    {
      path: "not-found",
      element: <NotFind />,
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
