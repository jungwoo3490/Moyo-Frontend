import { reset } from "@/common/styles/reset";
import { Global, css } from "@emotion/react";
import type { ReactElement } from "react";

const globalCss = css`
  ${reset}
`;
export function GlobalStyles(): ReactElement {
  return <Global styles={[globalCss]} />;
}
