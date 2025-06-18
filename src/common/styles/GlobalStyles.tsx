import { reset } from "@/common/styles/reset";
import { colors } from "@/common/styles/theme";
import { Global, css } from "@emotion/react";
import type { ReactElement } from "react";

const globalCss = css`
  ${reset}

  @font-face {
    font-family: "Pretendard";
    font-weight: 100 900;
    font-display: swap;
    src: url("/fonts/PretendardVariable.woff2") format("woff2")
      tech("variations");
  }

  .radix-themes {
    --default-font-family: "Pretendard Variable", Pretendard, -apple-system,
      BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI",
      "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic",
      "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif;
  }

  body {
    display: flex;
    justify-content: center;
    background-color: ${colors.gray3};
  }
`;

export function GlobalStyles(): ReactElement {
  return <Global styles={[globalCss]} />;
}
