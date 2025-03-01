import Header from "@/common/components/Header";
import Spacer from "@/common/components/Spacer";
import UserListItemCard from "@/common/components/UserListItemCard";
import UserProfileAvatar from "@/common/components/UserProfileAvatar";
import { colors } from "@/common/styles/theme";
import { rem } from "@/common/utils/rem";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { Blockquote, Card, Checkbox, Flex, Heading, Radio, Text } from "@radix-ui/themes";
import { version } from "react";
import { Link } from "react-router";

export default function MenuPage() {
  return (
    <>
      <Header left={"왼쪽"} center={"중앙"} right={"오른쪽"} />
      {version}
      <Card variant="surface">menu</Card>

      <Checkbox defaultChecked />
      <Heading size="6" css={css({ color: "red" })}>
        heading
      </Heading>
      <p>안녕 정우</p>
      <p>안녕 연서</p>
      <p>안녕 서현</p>
      <Blockquote weight="bold">quote quote</Blockquote>

      <UserListContainer>
        <Flex direction="column" gap="2">
          <UserListItemCard asChild>
            <Link to="/">
              <Flex>유저1</Flex>
            </Link>
          </UserListItemCard>

          <UserListItemCard asChild>
            <button type="button" onClick={() => console.log("here")}>
              유저2
            </button>
          </UserListItemCard>

          <UserListItemCard>
            <Flex gap="3">
              <Text as="label" size="2">
                <Radio name="example" value="1" defaultChecked color="indigo" />
                Default
              </Text>

              <Text as="label" size="2">
                <Radio name="example" value="1" color="cyan" />
                Comfortable
              </Text>
            </Flex>
          </UserListItemCard>

          <UserListItemCard>유저4</UserListItemCard>
        </Flex>
      </UserListContainer>

      <div>
        {/* fallback이 보여지는 케이스 -> 이미지 로딩 실패시 */}
        <UserProfileAvatar size="9" />
        {/* 세로 방향 spacing */}
        <Spacer height={10} />
        <UserProfileAvatar src="https://picsum.photos/id/237/200/300" size="9" />
      </div>
      <div css={{ display: "flex" }}>
        {/* fallback이 보여지는 케이스 -> 이미지 로딩 실패시 */}
        <UserProfileAvatar size="9" />
        {/* 가로 방향 spacing */}
        <Spacer width={10} />
        <UserProfileAvatar src="https://picsum.photos/id/237/200/300" size="9" />
      </div>
    </>
  );
}

const UserListContainer = styled.div({
  width: "100vw",
  padding: rem(1),

  backgroundColor: colors.main11,
});
