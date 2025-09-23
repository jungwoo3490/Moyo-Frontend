import { deleteUnfollowUser } from "@/Follow/apis/follow";
import { followQueryKeys } from "@/Follow/hooks/apis/queryKeys";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useDeleteUnfollowUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteUnfollowUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: followQueryKeys.all() });
    },
  });
}
