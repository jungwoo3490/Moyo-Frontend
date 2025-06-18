import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import svgr from "vite-plugin-svgr";
import fs from "node:fs";

const LOCALHOST_KEY_PATH = "localhost-key.pem";
const LOCALHOST_CERT_PATH = "localhost.pem";

const hasHttpsCertificates = fs.existsSync(LOCALHOST_KEY_PATH) && fs.existsSync(LOCALHOST_CERT_PATH);

export default defineConfig({
  plugins: [
    react({
      jsxImportSource: "@emotion/react",
    }),
    tsconfigPaths(),
    svgr({ include: "**/*.svg?react" }),
  ],
  server: {
    /** 서비스 로직에서 reissue가 필수적이므로 클라이언트에 refresh token을 쿠키로 설정할 수 있어야 합니다.
     * 이를 위해 API dev 서버는 인증 과정에서 https로 리다이렉션을 설정하고, 클라이언트 개발 환경도 https 서버로 구성합니다.
     */
    https: hasHttpsCertificates
      ? {
          key: fs.readFileSync(LOCALHOST_KEY_PATH),
          cert: fs.readFileSync(LOCALHOST_CERT_PATH),
        }
      : undefined,
  },
});
