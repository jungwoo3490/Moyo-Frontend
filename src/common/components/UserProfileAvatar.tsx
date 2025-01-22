import { Avatar, type AvatarProps } from "@radix-ui/themes";

type UserProfileAvatarProps = Omit<
  AvatarProps,
  "radius" | "variant" | "color" | "fallback"
>;

const UserProfileAvatar = ({ ...props }: UserProfileAvatarProps) => {
  return (
    <Avatar
      radius="full"
      variant="soft"
      color="gray"
      fallback={<>fallback image</>}
      {...props}
    />
  );
};

export default UserProfileAvatar;
