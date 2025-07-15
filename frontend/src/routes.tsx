import { RouteObject } from "react-router-dom";
import App from "./App.tsx";
import ErrorPage from "./pages/ErrorPage.tsx";
import HomePage from "./pages/HomePage.tsx";
import ProductDetailPage from "./pages/ProductDetailPage.tsx";
import ProductListPage from "./pages/ProductListPage.tsx";
import AdminHomePage from "./pages/admin/AdminHomePage.tsx";
import AdminLayout from "./pages/admin/AdminLayout.tsx";
import EditProductPage from "./pages/admin/EditProductPage.tsx";
import NewProductPage from "./pages/admin/NewProductPage.tsx";
import AdminProductListPage from "./pages/admin/ProductListPage.tsx";
import PrivateRoutes from "./components/PrivateRoutes";
import LoginPage from "./pages/LoginPage";
import OrdersPage from "./pages/OrdersPage";
import CheckoutPage from "./pages/CheckoutPage";

const routes: RouteObject[] = [
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/",
    element: <PrivateRoutes><App /></PrivateRoutes>,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "products", element: <ProductListPage /> },
      { path: "products/:id", element: <ProductDetailPage /> },
      { path: "orders", element: <OrdersPage /> },
      { path: "checkout", element: <CheckoutPage /> },
      {
        path: "admin",
        element: <AdminLayout />,
        children: [
          { index: true, element: <AdminHomePage /> },
          { path: "products", element: <AdminProductListPage /> },
          { path: "products/new", element: <NewProductPage /> },
          { path: "products/:id/edit", element: <EditProductPage /> },
        ],
      },
    ],
  },
];

export default routes;
