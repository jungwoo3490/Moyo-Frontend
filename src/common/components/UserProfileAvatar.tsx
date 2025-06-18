import { ImgUserProfile } from "@/assets/images";
import { Avatar, type AvatarProps } from "@radix-ui/themes";

type UserProfileAvatarProps = Omit<AvatarProps, "radius" | "variant" | "color" | "fallback">;

const UserProfileAvatar = (props: UserProfileAvatarProps) => {
  return (
    <Avatar
      radius="full"
      variant="soft"
      color="gray"
      fallback={<img src={ImgUserProfile} alt="유저 프로필 이미지" />}
      {...props}
    />
  );
};

export default UserProfileAvatar;
