import type { ComponentProps } from "react";

export const SidebarNavigation = ({ children, ...props }: ComponentProps<"nav">) => {
  return (
    <nav className="h-full py-6" {...props}>
      <ul className="m-0 flex flex-1 list-none flex-col items-center gap-4 p-0">{children}</ul>
    </nav>
  );
};
