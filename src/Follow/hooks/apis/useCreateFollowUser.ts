import { createFollowUser } from "@/Follow/apis/follow";
import { followQueryKeys } from "@/Follow/hooks/apis/queryKeys";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreateFollowUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createFollowUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: followQueryKeys.all() });
    },
  });
}
