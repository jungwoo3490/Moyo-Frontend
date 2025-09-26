import { BottomNav } from "@/common/components/BottomNav";
import Header from "@/common/components/Header";
import { useInfiniteScroll } from "@/common/hooks/useInfiniteScroll";
import { rem } from "@/common/utils/rem";
import styled from "@emotion/styled";
import { Flex, Spinner } from "@radix-ui/themes";
import { useState } from "react";
import { PodiumItem } from "./components/PodiumItem";
import { RankingItem } from "./components/RankingItem";
import { useQueryUserRanking } from "./hooks/useQueryUserRanking";

export function RankingPage() {
  const [selectedOption, setSelectedOption] = useState<"week" | "month" | "year">("week");

  const {
    data: userRanking,
    isPending: isPendingUserRanking,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useQueryUserRanking({
    duration: selectedOption,
  });

  const observerRef = useInfiniteScroll({
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  });

  const allRankingList = userRanking?.pages.flatMap((page) => page.data.rankingList) ?? [];

  const topThree = allRankingList.slice(0, 3);
  const rest = allRankingList.slice(3);

  return (
    <>
      <Header title="랭킹" />
      <PageBody>
        <PodiumContainer>
          <RankingOptionButtonGroup>
            <RankingOptionButton isSelected={selectedOption === "week"} onClick={() => setSelectedOption("week")}>
              주간
            </RankingOptionButton>
            <Divider />
            <RankingOptionButton isSelected={selectedOption === "month"} onClick={() => setSelectedOption("month")}>
              월간
            </RankingOptionButton>
            <Divider />
            <RankingOptionButton isSelected={selectedOption === "year"} onClick={() => setSelectedOption("year")}>
              연간
            </RankingOptionButton>
          </RankingOptionButtonGroup>
          {!isPendingUserRanking && (
            <PodiumItemWrapper>
              <PodiumItem
                rank={2}
                nickname={topThree[1]?.username || ""}
                point={topThree[1]?.rankPoint || 0}
                profileImage={topThree[1]?.profileImageUrl || ""}
              />
              <PodiumItem
                rank={1}
                nickname={topThree[0]?.username || ""}
                point={topThree[0]?.rankPoint || 0}
                profileImage={topThree[0]?.profileImageUrl || ""}
              />
              <PodiumItem
                rank={3}
                nickname={topThree[2]?.username || ""}
                point={topThree[2]?.rankPoint || 0}
                profileImage={topThree[2]?.profileImageUrl || ""}
              />
            </PodiumItemWrapper>
          )}
        </PodiumContainer>
        <RankingList>
          {!isPendingUserRanking &&
            rest.map((user, index) => (
              <RankingItem
                key={user.userid}
                rank={index + 4}
                nickname={user.username}
                point={user.rankPoint}
                profileImage={user.profileImageUrl}
              />
            ))}

          <Flex ref={observerRef} justify="center" align="center" css={{ width: "100%", height: rem(6) }}>
            {isFetchingNextPage && <Spinner css={{ height: rem(2.5) }} />}
          </Flex>
        </RankingList>
      </PageBody>
      <BottomNav />
    </>
  );
}

const PageBody = styled.div({
  width: "100%",
  height: "calc(100dvh - 9.8rem)",
  display: "flex",
  flexDirection: "column",
});

const PodiumContainer = styled.div({
  position: "relative",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",

  width: "100%",
  height: rem(26),

  background: "linear-gradient(to bottom, #8745c7 0%, #520189 40%, #000000 100%)",
});

const PodiumItemWrapper = styled.div({
  position: "absolute",
  top: rem(6.3),
  width: "100%",
  height: rem(15),
});

const RankingOptionButtonGroup = styled.div({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",

  width: rem(22),
  height: rem(2.7),
  padding: `0 ${rem(0.3)}`,
  marginTop: rem(1.2),

  borderRadius: rem(3),
  backgroundColor: "rgba(75, 75, 75, 0.85)",
});

const RankingOptionButton = styled.button<{ isSelected: boolean }>(({ isSelected }) => ({
  flex: 1,

  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  height: rem(2.1),

  borderRadius: rem(3),

  fontSize: rem(1),
  fontWeight: 700,
  color: "#ffffff",

  backgroundColor: isSelected ? "#A1A1A1" : "transparent",
}));

const RankingList = styled.div({
  position: "absolute",
  bottom: 0,

  display: "flex",
  flexDirection: "column",
  gap: rem(1.1),

  width: "100%",
  height: "calc(100dvh - 29rem)",
  padding: `${rem(2.3)} ${rem(1.3)}`,
  overflowY: "auto", // 스크롤 가능하도록 설정

  borderRadius: `${rem(1.5)} ${rem(1.5)} 0 0`,
  backgroundColor: "#ffffff",
});

const Divider = styled.div({
  width: rem(0.1),
  height: rem(2),
  margin: `0 ${rem(0.3)}`,
  backgroundColor: "#A1A1A1",
});
