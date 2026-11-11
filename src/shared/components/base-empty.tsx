import { Inbox, LucideIcon } from "lucide-react";
import { ReactNode } from "react";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/shared/components/ui/empty";

type BaseEmptyProps = {
  icon?: LucideIcon;
  title: string;
  description: string;
  children?: ReactNode;
};

export const BaseEmpty = ({ icon: Icon = Inbox, title, description, children }: BaseEmptyProps) => {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Icon />
        </EmptyMedia>
        <EmptyTitle>{title}</EmptyTitle>
        <EmptyDescription>{description}</EmptyDescription>
      </EmptyHeader>
      <EmptyContent>{children}</EmptyContent>
    </Empty>
  );
};
