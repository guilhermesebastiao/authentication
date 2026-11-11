import { HttpError } from "@/shared/lib/http/http-error";
import { LucideIcon, ServerCrash } from "lucide-react";
import { ReactNode } from "react";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/shared/components/ui/empty";

type BaseErrorProps = {
  error: HttpError;
  icon?: LucideIcon;
  children?: ReactNode;
};

export const BaseError = ({ error, icon: Icon = ServerCrash, children }: BaseErrorProps) => {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Icon />
        </EmptyMedia>
        <EmptyTitle>{error.data.title}</EmptyTitle>
        <EmptyDescription>{error.data.message}</EmptyDescription>
      </EmptyHeader>
      <EmptyContent>{children}</EmptyContent>
    </Empty>
  );
};
