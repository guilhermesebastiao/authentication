import type { icons } from "lucide-react";

export type SidebarIcon = keyof typeof icons;

export type LinkPage = {
  name: string;
  path: string;
  icon: SidebarIcon;
};
