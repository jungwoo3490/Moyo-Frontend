import { Card, type CardProps } from "@radix-ui/themes";
import type { ReactNode } from "react";

interface Props extends CardProps {
  children: ReactNode;
}

export default function UserListItemCard({ children, ...props }: Props) {
  return (
    <Card variant="classic" {...props}>
      {children}
    </Card>
  );
}
