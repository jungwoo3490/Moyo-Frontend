import type { FollowDetectType } from "@/Follow/apis/follow";
import { DetectTypeSelector } from "@/Follow/components/DetectTypeSelector";
import { FollowList } from "@/Follow/components/FollowList";
import { RefreshButton } from "@/Follow/components/RefreshButton";
import { useQueryFollowDetect } from "@/Follow/hooks/apis/useQueryFollowDetect";
import { BottomNav } from "@/common/components/BottomNav";
import Header from "@/common/components/Header";
import Spacer from "@/common/components/Spacer";
import UserListItemCard from "@/common/components/UserListItemCard";
import UserProfileAvatar from "@/common/components/UserProfileAvatar";
import { useInfiniteScroll } from "@/common/hooks/useInfiniteScroll";
import { colors } from "@/common/styles/theme";
import { rem } from "@/common/utils/rem";
import styled from "@emotion/styled";
import { Flex, Skeleton, Spinner, Text } from "@radix-ui/themes";
import { useState } from "react";

export function FollowPage() {
  const [selectedType, setSelectedType] = useState<FollowDetectType>("mutual");
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useQueryFollowDetect(selectedType);

  const observerRef = useInfiniteScroll({
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  });

  return (
    <>
      <Header
        renderCenter={() => <>팔로우 관리</>}
        renderRight={data ? () => <RefreshButton lastSyncAt={data.pages[0].data.lastSyncAt} /> : undefined}
      />

      <Container>
        <Flex direction="column" align="center" gap="4">
          <Flex direction="column" align="center" css={{ width: "100%" }}>
            <Spacer height={2} />
            <DetectTypeSelector value={selectedType} onChange={setSelectedType} />
            <Spacer height={2} />
            <Flex align="center" gap="1" css={{ margin: `0 auto 0 ${rem(2)}` }}>
              <Text size="2" weight="bold">
                {selectedType === "mutual" && "맞팔로우"}
                {selectedType === "follow-only" && "나만 팔로우"}
                {selectedType === "followed-only" && "상대만 팔로우"}
              </Text>
              {data && (
                <Text
                  size="1"
                  weight="bold"
                  css={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: colors.gray4,
                    color: colors.gray11,
                    borderRadius: "50%",
                    padding: rem(0.2),
                    minWidth: 20,
                  }}
                >
                  {data.pages[0].data.totalUserCount}
                </Text>
              )}
            </Flex>
            <Spacer height={2} />
          </Flex>
        </Flex>

        {data ? (
          <>
            <FollowList type={selectedType} userList={data.pages.flatMap(({ data: { userList } }) => userList)} />

            <Flex ref={observerRef} justify="center" align="center" css={{ width: "100%", height: rem(6) }}>
              {isFetchingNextPage && <Spinner css={{ height: rem(2.5) }} />}
            </Flex>
          </>
        ) : (
          <Flex direction="column" gap="2" css={{ padding: `0 ${rem(2)}` }}>
            {Array.from({ length: 10 }, (_, idx) => idx).map((idx) => (
              <Skeleton key={idx}>
                <UserListItemCard>
                  <UserProfileAvatar />
                </UserListItemCard>
              </Skeleton>
            ))}
          </Flex>
        )}
      </Container>
      <BottomNav />
    </>
  );
}

const Container = styled.div({
  overflowY: "auto",
  height: "100vh",
  backgroundColor: colors.gray2,
});
