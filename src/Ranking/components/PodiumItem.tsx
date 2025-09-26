import UserProfileAvatar from "@/common/components/UserProfileAvatar";
import { rem } from "@/common/utils/rem";
import styled from "@emotion/styled";

interface PodiumItemProps {
  rank: number;
  nickname: string;
  point: number;
  profileImage: string;
}

export function PodiumItem({ rank, nickname, point, profileImage }: PodiumItemProps) {
  return (
    <PodiumItemWrapper rank={rank}>
      <ImageWrapper>
        <UserProfileAvatar src={profileImage} alt="프로필 사진" style={{ width: "100%", height: "100%" }} />
        <Medal rank={rank}>{rank}</Medal>
      </ImageWrapper>
      <Nickname rank={rank}>{nickname}</Nickname>
      <Point>{point}pt</Point>
    </PodiumItemWrapper>
  );
}

const PodiumItemWrapper = styled.div<{ rank: number }>(({ rank }) => {
  const getPosition = () => {
    switch (rank) {
      case 1:
        return {
          left: "50%",
          transform: "translateX(-50%)",
          top: 0,
        };
      case 2:
        return {
          left: "2rem",
          top: rem(3),
        };
      case 3:
        return {
          right: "2rem",
          top: rem(3),
        };
      default:
        return {};
    }
  };

  return {
    position: "absolute",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "fit-content",
    ...getPosition(),
  };
});

const ImageWrapper = styled.div({
  position: "relative",

  width: rem(7.8),
  height: rem(7.8),
  padding: rem(0.3),
  backgroundColor: "#ffffff",

  borderRadius: rem(999),
});

const Medal = styled.div<{ rank: number }>(({ rank }) => ({
  position: "absolute",
  bottom: 0,
  right: 0,

  width: rem(2.4),
  height: rem(2.4),

  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  fontSize: rem(1.7),
  fontWeight: 700,
  color: "#ffffff",

  borderRadius: rem(999),
  backgroundColor: rank === 1 ? "#F8A900" : rank === 2 ? "#B4B5BB" : rank === 3 ? "#D46A28" : "#FFFFFF",
}));

const Nickname = styled.div<{ rank: number }>(({ rank }) => ({
  marginTop: rem(0.5),

  fontSize: rem(1.7),
  fontWeight: 700,
  color: rank === 1 ? "#F8A900" : rank === 2 ? "#B4B5BB" : rank === 3 ? "#D46A28" : "#ffffff",
}));

const Point = styled.div({
  marginTop: rem(0.1),

  fontSize: rem(1.7),
  fontWeight: 700,
  color: "#ffffff",
});
