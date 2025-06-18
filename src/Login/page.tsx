import { IconGithubLogo } from "@/assets/icons";
import Spacer from "@/common/components/Spacer";
import { colors } from "@/common/styles/theme";
import { rem } from "@/common/utils/rem";
import styled from "@emotion/styled";
import { indigo, slate } from "@radix-ui/colors";

export function LoginPage() {
  return (
    <Container>
      <BackgroundVideo autoPlay muted loop>
        <source src="src/assets/videos/login_background.mp4" type="video/mp4" />
      </BackgroundVideo>

      <TextContainer>
        <DimmedBackground>
          <Title>
            랭킹으로 경쟁하며,
            <br />
            함께 만들어가는 프로젝트
          </Title>
          <Spacer height={1} />
          <Description>PR 리뷰 요청과 맞팔 관리도 한 곳에서 </Description>
          <Spacer height={3} />
          <LoginButton
            onClick={() => {
              window.location.href = `${import.meta.env.VITE_API_BASE_URL}/auth/login/github`;
            }}
          >
            <IconGithubLogo width={48} height={48} />
            <LoginText>Github로 시작하기</LoginText>
          </LoginButton>
        </DimmedBackground>
      </TextContainer>
    </Container>
  );
}

const Container = styled.div({
  height: "100vh",
  position: "relative",
});

const BackgroundVideo = styled.video({
  width: "100%",
  height: "100vh",
  objectFit: "cover",
});

const TextContainer = styled.div({
  width: "100%",
  height: "100vh",

  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "flex-end",

  position: "absolute",
  top: 0,

  background: "rgba(0, 0, 0, 0.2)",
});

const Title = styled.h1({
  color: colors.gray1,
  fontWeight: 700,
  fontSize: rem(3.2),
  textAlign: "center",
});

const Description = styled.p({
  color: colors.gray1,
  fontWeight: 700,
  fontSize: rem(1.8),
  textAlign: "center",
});

const LoginButton = styled.button({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  backgroundColor: indigo.indigo1,

  width: rem(24),
  height: rem(5),

  borderRadius: rem(5),
  padding: `0 ${rem(0.5)}`,
});

const LoginText = styled.span({
  width: "90%",

  fontWeight: 700,
  fontSize: rem(1.8),

  color: slate.slate12,
});

const DimmedBackground = styled.div({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",

  width: "100%",

  background:
    "linear-gradient(360deg, #000000 0%, rgba(0, 0, 0, 0.89875) 35.5%, rgba(0, 0, 0, 0.7) 54.5%, rgba(0, 0, 0, 0.5) 77.5%, rgba(0, 0, 0, 0.2) 85%, rgba(0, 0, 0, 0) 100%)",

  paddingTop: rem(8),
  paddingBottom: "18vh",
  "@media screen and (min-width:500px)": {
    paddingBottom: "10vh",
  },
});
