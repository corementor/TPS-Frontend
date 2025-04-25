import AppLayout from "@/layout/AppLayout";
import LoginPage from "@/pages/login/LoginPage";
import RegisterPage from "@/pages/register/RegisterPage";
import TaxDeclarationPage from "@/pages/taxDeclaration/TaxDeclarationPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
const router = createBrowserRouter([
    {
        path: "/",
        element: <AppLayout />,
        children: [
            {
                path: "tax-declaration",
                element: <TaxDeclarationPage />,
            }
        ]
    },
  {
    path: "login",
    element: <LoginPage />,
  },
  {
    path: "register",
    element: <RegisterPage />,
  },
  {
    path: "*",
    element: <h1>Not Found</h1>,
  },
]);

const Router = () => <RouterProvider router={router} />;

export default Router;