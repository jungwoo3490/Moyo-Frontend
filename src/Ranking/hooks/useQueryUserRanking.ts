import type { ApiResponse } from "@/common/types/api";
import { type InfiniteData, useInfiniteQuery } from "@tanstack/react-query";
import { type durationType, queryUserRanking } from "../apis/ranking";

interface RankingUserResponse {
  rankingList: Array<{
    userid: number;
    profileImageUrl: string;
    username: string;
    rankPoint: number;
  }>;
  lastPage: boolean;
}

export function useQueryUserRanking({ duration }: { duration: durationType }) {
  return useInfiniteQuery<
    ApiResponse<RankingUserResponse>,
    Error,
    InfiniteData<ApiResponse<RankingUserResponse>>,
    string[],
    number
  >({
    queryKey: ["userRanking", duration],
    queryFn: ({ pageParam = 0 }) => queryUserRanking({ duration, page: pageParam, size: 20 }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.data.lastPage) {
        return undefined;
      }
      return allPages.length;
    },
  });
}
