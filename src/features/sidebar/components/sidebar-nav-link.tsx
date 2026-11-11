"use client";

import { Tooltip, TooltipContent, TooltipTrigger } from "@/shared/components/ui/tooltip";
import { LinkPage } from "@/features/sidebar/types";
import { usePathname } from "next/navigation";
import { icons } from "lucide-react";
import Link from "next/link";

type SidebarNavLinkProps = {
  data: LinkPage;
};

export const SidebarNavLink = ({ data }: SidebarNavLinkProps) => {
  const Icon = icons[data.icon];

  const pathname = usePathname();

  return (
    <li>
      <Tooltip>
        <TooltipTrigger
          render={
            <Link
              href={data.path}
              data-active={pathname === data.path}
              className="group size-11.25 flex items-center justify-center rounded-xl hover:bg-foreground/8 data-[active=true]:bg-primary transition-all duration-250"
            >
              <Icon className="size-5 shrink-0 text-foreground/50 group-data-[active=true]:text-white" />
            </Link>
          }
        />
        <TooltipContent>{data.name}</TooltipContent>
      </Tooltip>
    </li>
  );
};
