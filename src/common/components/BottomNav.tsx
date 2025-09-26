import { IconFollow, IconFollowActive, IconRanking, IconRankingActive } from "@/assets/icons";
import styled from "@emotion/styled";
import { useLocation, useNavigate } from "react-router";
import { colors } from "../styles/theme";
import { rem } from "../utils/rem";

const navItems = [
  {
    label: "팔로우",
    path: "/follow",
    icon: IconFollow,
    activeIcon: IconFollowActive,
  },
  {
    label: "랭킹",
    path: "/ranking",
    icon: IconRanking,
    activeIcon: IconRankingActive,
  },
];

export function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <BottomNavWrapper>
      {navItems.map((item) => {
        const isActive = location.pathname === item.path;

        return (
          <BottomNavItem key={item.path} onClick={() => navigate(item.path)} type="button">
            {isActive ? <item.activeIcon /> : <item.icon />}
            <BottomNavItemText active={isActive}>{item.label}</BottomNavItemText>
          </BottomNavItem>
        );
      })}
    </BottomNavWrapper>
  );
}

const BottomNavWrapper = styled.nav({
  position: "sticky",
  bottom: 0,

  display: "flex",
  justifyContent: "space-around",
  alignItems: "center",

  width: "100%",
  height: "5rem",
  backgroundColor: "white",

  borderTop: `1px solid ${colors.gray2}`,
});

const BottomNavItem = styled.button({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",

  gap: rem(0.3),
});

const BottomNavItemText = styled.span<{ active?: boolean }>(({ active }) => ({
  fontSize: rem(1),
  fontWeight: 700,
  color: active ? "#520189" : "#ABABAB",
}));
