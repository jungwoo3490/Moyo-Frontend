import UserProfileAvatar from "@/common/components/UserProfileAvatar";
import { rem } from "@/common/utils/rem";
import styled from "@emotion/styled";

interface RankingItemProps {
  rank: number;
  nickname: string;
  point: number;
  profileImage: string;
}

export function RankingItem({ rank, nickname, point, profileImage }: RankingItemProps) {
  return (
    <RankingItemWrapper>
      <LeftSection>
        <Rank>{rank}</Rank>
        <ImageWrapper>
          <UserProfileAvatar src={profileImage} alt="프로필 사진" style={{ width: "100%", height: "100%" }} />
        </ImageWrapper>
        <Nickname>{nickname}</Nickname>
      </LeftSection>
      <Point>{point}pt</Point>
    </RankingItemWrapper>
  );
}

const LeftSection = styled.div({
  display: "flex",
  alignItems: "center",
  gap: rem(2.6),
});

const RankingItemWrapper = styled.div({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  flexShrink: 0,

  width: "100%",
  height: rem(6.9),

  padding: `0 ${rem(2)}`,

  borderRadius: rem(1),
  backgroundColor: "rgba(138, 138, 138, 0.19)",
});

const Rank = styled.div({
  fontSize: rem(2),
  fontWeight: 700,
  color: "#000000",
});

const ImageWrapper = styled.div({
  position: "relative",

  width: rem(5),
  height: rem(5),
  padding: rem(0.2),
  backgroundColor: "#ffffff",

  borderRadius: rem(999),
});

const Nickname = styled.div({
  fontSize: rem(1.6),
  fontWeight: 700,
  color: "#000000",
});

const Point = styled.div({
  fontSize: rem(1.6),
  fontWeight: 700,
  color: "#000000",

  justifySelf: "flex-end",
});
