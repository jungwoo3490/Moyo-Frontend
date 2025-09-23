import { FollowPage } from "@/Follow/page";
import { LoginPage } from "@/Login/page";
import MenuPage from "@/Menu/page";
import GlobalLayout from "@/common/components/GlobalLayout";
import { authLoader } from "@/loaders/authLoader";
import { createBrowserRouter } from "react-router";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <GlobalLayout />,
    children: [
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        loader: authLoader,
        children: [
          {
            path: "menu",
            element: <MenuPage />,
          },
          {
            path: "follow",
            element: <FollowPage />,
          },
        ],
      },
    ],
  },
]);
