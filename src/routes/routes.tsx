import LoginPage from "@/pages/login/LoginPage";
import RegisterPage from "@/pages/register/RegisterPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
const router = createBrowserRouter([
    {
      path: "login",
      element: <LoginPage/>,
    },
    {
        path: "register",
        element: <RegisterPage/>,
      },
])

const Router = () => <RouterProvider router={router} />;

export default Router;