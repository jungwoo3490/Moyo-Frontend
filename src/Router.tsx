import { FollowPage } from "@/Follow/page";
import { LoginPage } from "@/Login/page";
import MenuPage from "@/Menu/page";
import GlobalLayout from "@/common/components/GlobalLayout";
import { authLoader } from "@/loaders/authLoader";
import { Navigate, createBrowserRouter } from "react-router";
import { RankingPage } from "./Ranking/page";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <GlobalLayout />,
    children: [
      // 메인페이지 부재로 임시로 초기 / 접근시 강제 로그인 리다이렉트 구현 부분
      {
        index: true,
        element: <Navigate to="/login" replace />,
      },
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
            path: "ranking",
            element: <RankingPage />,
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
