import type { ApiResponse } from "@/common/types/api";
import ky from "ky";

interface ReissueBody {
  accessToken: string;
}

export async function reissue() {
  return ky
    .post<ApiResponse<ReissueBody>>(`${import.meta.env.VITE_API_BASE_URL}/auth/reissue/token`, {
      credentials: "include",
    })
    .json();
}
