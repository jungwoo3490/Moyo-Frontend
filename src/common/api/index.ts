import { reissue } from "@/common/api/reissue";
import { accessTokenStore } from "@/common/stores/accessTokenStore";
import ky from "ky";
import { redirect } from "react-router";

export const apiClient = ky.create({
  prefixUrl: import.meta.env.VITE_API_BASE_URL,
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

            return apiClient(request);
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
