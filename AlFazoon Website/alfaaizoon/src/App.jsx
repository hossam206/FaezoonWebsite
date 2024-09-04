import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Header from "./_Components/Header";
import Dashboard from "./_Components/Dashboard";
import UserPage from "./_Components/UserPage";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Header />,
    },
    {
      path: "Dashboard",
      element: <Dashboard />,
    },
    {
      path: "UserPage",
      element: <UserPage />,
    },
    // {
    //   path: "*",
    //   element: <RouteNotFound />,
    // },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
