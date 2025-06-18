import { rem } from "@/common/utils/rem";
import styled from "@emotion/styled";
import { Outlet } from "react-router";

export default function GlobalLayout() {
  return (
    <LayoutWrapper>
      <Outlet />
    </LayoutWrapper>
  );
}

const LayoutWrapper = styled.div({
  width: "100vw",
  height: "100vh",
  maxWidth: rem(80),
});
