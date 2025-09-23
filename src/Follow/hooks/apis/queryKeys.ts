import type { FollowDetectType } from "@/Follow/apis/follow";

export const followQueryKeys = {
  all: () => ["follow"],
  list: (type: FollowDetectType) => [...followQueryKeys.all(), type],
};
