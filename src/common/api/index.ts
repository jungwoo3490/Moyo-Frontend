import { reissue } from "@/common/api/reissue";
import { accessTokenStore } from "@/common/stores/accessTokenStore";
import type { ApiResponse } from "@/common/types/api";
import ky, { type Options } from "ky";
import { redirect } from "react-router";

const baseApiClient = ky.create({
  prefixUrl: `${import.meta.env.VITE_API_BASE_URL}`,
  hooks: {
    beforeRequest: [
      (request) => {
        const atk = accessTokenStore.get();

        if (atk != null) {
          request.headers.set("Authorization", `Bearer ${atk}`);
        }
      },
    ],
    afterResponse: [
      async (request, _options, response) => {
        if (response.status === 401) {
          try {
            const {
              data: { accessToken },
            } = await reissue();
            accessTokenStore.set(accessToken);

            return baseApiClient(request);
          } catch (e) {
            accessTokenStore.clear();
            return redirect("/login");
          }
        }
        return response;
      },
    ],
  },
});

export const apiClient = {
  get: <T>(url: string, options?: Options) => baseApiClient.get(url, options).json<ApiResponse<T>>(),

  post: <T>(url: string, options?: Options) => baseApiClient.post(url, options).json<ApiResponse<T>>(),

  put: <T>(url: string, options?: Options) => baseApiClient.put(url, options).json<ApiResponse<T>>(),

  delete: <T>(url: string, options?: Options) => baseApiClient.delete(url, options).json<ApiResponse<T>>(),

  patch: <T>(url: string, options?: Options) => baseApiClient.patch(url, options).json<ApiResponse<T>>(),
};
