import { apiClient } from "@/common/api";

export type FollowDetectType = "mutual" | "follow-only" | "followed-only";

export interface FollowDetectUser {
  githubUserId: number;
  username: string;
  profileImgUrl: string;
}

export interface FollowDetectResponse {
  userList: FollowDetectUser[];
  lastPage: boolean;
  totalUserCount: number;
  lastSyncAt: string;
}

const MAX_RETRY = 40;
const POLL_DELAY_MS = 500;

export async function queryFollowDetect({
  detectType,
  lastGithubUserId,
}: { detectType: FollowDetectType; lastGithubUserId?: number }) {
  let retry = 0;

  const poll = async () => {
    const response = await apiClient.get<FollowDetectResponse>(`api/v1/users/me/followings/${detectType}`, {
      searchParams: lastGithubUserId ? { lastGithubUserId } : undefined,
    });
    if (response.status === 202) {
      if (retry > MAX_RETRY) {
        throw new Error("Follow detect polling exceeded max retries");
      }
      await new Promise((resolve) => setTimeout(resolve, POLL_DELAY_MS));
      retry++;
      return poll();
    }

    return response;
  };

  return poll();
}

export async function createFollowUser(githubUserId: FollowDetectUser["githubUserId"]) {
  return apiClient.post<FollowDetectResponse>(`api/v1/follow/${githubUserId}`);
}

export async function createFollowRefresh() {
  return apiClient.post<null>("api/v1/users/me/followings/refresh");
}

export async function deleteUnfollowUser(githubUserId: FollowDetectUser["githubUserId"]) {
  return apiClient.delete<FollowDetectResponse>(`api/v1/unfollow/${githubUserId}`);
}
