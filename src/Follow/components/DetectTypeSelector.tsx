import type { FollowDetectType } from "@/Follow/apis/follow";
import { colors } from "@/common/styles/theme";
import { SegmentedControl } from "@radix-ui/themes";

interface Props {
  value: FollowDetectType;
  onChange: (value: FollowDetectType) => void;
}

export function DetectTypeSelector({ value, onChange }: Props) {
  return (
    <SegmentedControl.Root
      radius="large"
      size="3"
      value={value}
      onValueChange={onChange}
      variant="classic"
      css={{
        position: "sticky",
        top: 0,
        border: `1px solid ${colors.gray4}`,
        boxShadow: "0 0 3px 0 rgba(0, 0, 0, 0.1)",
      }}
    >
      <SegmentedControl.Item value="mutual">맞팔</SegmentedControl.Item>
      <SegmentedControl.Item value="followed-only">상대만 팔로우</SegmentedControl.Item>
      <SegmentedControl.Item value="follow-only">나만 팔로우</SegmentedControl.Item>
    </SegmentedControl.Root>
  );
}
