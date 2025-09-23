import { createFollowRefresh } from "@/Follow/apis/follow";
import { followQueryKeys } from "@/Follow/hooks/apis/queryKeys";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreateFollowRefresh() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createFollowRefresh,
    onSuccess: () => {
      queryClient.resetQueries({ queryKey: followQueryKeys.all() });
    },
  });
}
