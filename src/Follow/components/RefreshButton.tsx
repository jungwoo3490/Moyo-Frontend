import { useCreateFollowRefresh } from "@/Follow/hooks/apis/useCreateFollowRefresh";
import { IconRefreshArrow } from "@/assets/icons";
import { colors } from "@/common/styles/theme";
import { formatDate } from "@/common/utils/formatDate";
import styled from "@emotion/styled";
import { Button, Flex, Text } from "@radix-ui/themes";
import { useEffect, useRef, useState } from "react";

interface Props {
  lastSyncAt: string;
}

export function RefreshButton({ lastSyncAt }: Props) {
  const [isRefreshEnabled, setIsRefreshEnabled] = useState(() => checkRefreshEnabled(lastSyncAt));

  const [showTooltip, setShowTooltip] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);

  const { mutate: refresh } = useCreateFollowRefresh();

  useEffect(() => {
    if (isRefreshEnabled) return;

    const updateCanRefresh = () => {
      const enabled = checkRefreshEnabled(lastSyncAt);
      setIsRefreshEnabled(enabled);

      if (enabled) {
        clearInterval(intervalId);
      }
    };

    const intervalId = setInterval(updateCanRefresh, 30000);

    return () => clearInterval(intervalId);
  }, [lastSyncAt, isRefreshEnabled]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (tooltipRef.current && !tooltipRef.current.contains(event.target as Node)) {
        setShowTooltip(false);
      }
    };

    if (showTooltip) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showTooltip]);

  return (
    <Flex gap="2" align="center" style={{ position: "relative" }}>
      <div ref={tooltipRef}>
        <Text
          size="1"
          weight="medium"
          color="gray"
          css={{
            padding: "1rem 0",
            marginLeft: "auto",
            cursor: "pointer",
          }}
          onClick={() => setShowTooltip(!showTooltip)}
        >
          {getTimeAgo(lastSyncAt)}
        </Text>

        {showTooltip && <ToolTip>{formatDate(lastSyncAt)}</ToolTip>}
      </div>

      <Button
        disabled={!isRefreshEnabled}
        onClick={() => refresh()}
        css={{
          padding: 0,
          borderRadius: "50%",
          aspectRatio: 1,
          background: colors.main5,
          cursor: "pointer",
          "&:disabled": {
            cursor: "default",
            background: colors.gray5,
            opacity: 0.3,
          },
        }}
      >
        <IconRefreshArrow width={20} height={20} style={{ color: colors.main9 }} />
      </Button>
    </Flex>
  );
}

function getTimeAgo(timestamp: string) {
  const now = new Date();
  const timestampDate = new Date(timestamp);
  const diffInMinutes = Math.round((now.getTime() - timestampDate.getTime()) / (1000 * 60));

  if (diffInMinutes < 1) {
    return "방금 전";
  }

  if (diffInMinutes < 60) {
    return `${diffInMinutes}분 전`;
  }

  if (diffInMinutes < 1440) {
    const hours = Math.floor(diffInMinutes / 60);
    return `${hours}시간 전`;
  }

  const days = Math.floor(diffInMinutes / 1440);
  return `${days}일 전`;
}

function checkRefreshEnabled(timestamp: string) {
  const timestampDate = new Date(timestamp);
  // 서버 제한(5분) + 오차 대비 10초 버퍼 두기
  const fiveMinutesTenSecondsLater = new Date(timestampDate.getTime() + 5 * 60 * 1000 + 10 * 1000);
  const now = new Date();

  return fiveMinutesTenSecondsLater < now;
}

const ToolTip = styled.div({
  position: "absolute",
  top: "100%",
  right: 0,
  backgroundColor: colors.gray11,
  color: colors.gray1,
  padding: "8px 12px",
  borderRadius: "6px",
  fontSize: "12px",
  whiteSpace: "nowrap",
  zIndex: 1000,
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
  marginTop: "4px",
});
