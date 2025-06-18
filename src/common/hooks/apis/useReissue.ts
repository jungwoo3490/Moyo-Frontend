import { reissue } from "@/common/api/reissue";
import { accessTokenStore } from "@/common/stores/accessTokenStore";
import { useMutation } from "@tanstack/react-query";

export function useReissue() {
  return useMutation({
    mutationFn: reissue,
    onSuccess({ data }) {
      accessTokenStore.set(data.accessToken);
    },
    onError() {
      // 에러 바운더리 추가 전까지는 모든 종류의 에러에 대해 login으로 이동시킵니다.
      window.location.href = "/login";
    },
  });
}
