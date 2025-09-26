import { apiClient } from "@/common/api";

export type durationType = "week" | "month" | "year";

interface RankingUser {
  userid: number;
  profileImageUrl: string;
  username: string;
  rankPoint: number;
}

interface RankingUserResponse {
  rankingList: RankingUser[];
  lastPage: boolean;
}

interface QueryUserRankingParams {
  duration: durationType;
  page?: number;
  size?: number;
}

export async function queryUserRanking({ duration, page = 0, size = 20 }: QueryUserRankingParams) {
  const params = new URLSearchParams({
    period: duration,
    page: page.toString(),
    size: size.toString(),
  });

  return apiClient.get<RankingUserResponse>(`api/v1/rankings?${params.toString()}`);
}
