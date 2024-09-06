import {
  BrowserRouter,
  createBrowserRouter,
  json,
  RouterProvider,
} from "react-router-dom";
import Header from "./_Components/Header";
import Dashboard from "./_Components/Dashboard";
import UserPage from "./_Components/UserPage";
import NotFind from "./_Components/NotFind";
import { useEffect } from "react";

function App() {
  const userRole = JSON.parse(localStorage.getItem("token"));



  //const decodedToken =  jwtDecode(findUser.token);
  //console.log(decodedToken)

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Header />,
    },

    {
      path: "Dashboard",
      element: userRole?.role === "admin" ? <Dashboard /> : <NotFind />,
    },

    {
      path: "UserPage",
      element: userRole?.role === "user" ? <UserPage /> : <NotFind />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
