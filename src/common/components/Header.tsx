import styled from "@emotion/styled";
import type { ReactElement } from "react";
import { Z_INDEX } from "../constants/zIndex";

interface HeaderProps {
  left?: ReactElement | string;
  center: ReactElement | string;
  right?: ReactElement | string;
}

function Header({ left, center, right }: HeaderProps) {
  return (
    <HeaderWrapper aria-label="페이지 헤더">
      <LeftElement>{left}</LeftElement>
      <CenterElement as={typeof center === "string" ? "h1" : "div"}>{center}</CenterElement>
      <RightElement>{right}</RightElement>
    </HeaderWrapper>
  );
}

export default Header;

const HeaderWrapper = styled.header({
  position: "sticky",
  zIndex: Z_INDEX.HEADER,
  top: 0,

  display: "flex",

  width: "100%",
  height: "4.8rem",

  backgroundColor: "white",
});

const LeftElement = styled.div({
  display: "flex",
  alignItems: "center",

  position: "absolute",
  left: "1.5rem",

  height: "100%",
});

const CenterElement = styled.div({
  display: "flex",
  alignItems: "center",

  margin: "0 auto",
  height: "100%",
});

const RightElement = styled.div({
  display: "flex",
  alignItems: "center",

  position: "absolute",
  right: "1.5rem",

  height: "100%",
});
