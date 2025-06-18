import { useReissue } from "@/common/hooks/apis/useReissue";
import { useEffect } from "react";
import { Outlet } from "react-router";

export function AuthTokenGuard() {
  const { mutate: initAuth } = useReissue();

  useEffect(() => {
    initAuth();
  }, [initAuth]);

  return <Outlet />;
}
