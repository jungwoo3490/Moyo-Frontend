import ky from "ky";
import type { ApiResponse } from "../types/api";

interface ReissueBody {
  accessToken: string;
}

// apiClient 미사용 - afterResponse hook에서 무한 루프 발생 방지
export async function reissue() {
  return ky
    .post<ApiResponse<ReissueBody>>(`${import.meta.env.VITE_API_BASE_URL}/api/v1/auth/reissue/token`, {
      credentials: "include",
    })
    .json();
}
