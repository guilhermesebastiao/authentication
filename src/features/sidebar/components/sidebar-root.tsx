import { twMerge } from "tailwind-merge";
import { ComponentProps } from "react";

export const SidebarRoot = ({ children, className, ...props }: ComponentProps<"aside">) => {
  return (
    <aside
      className={twMerge(
        "w-20 flex flex-col h-full transition-all ease-in-out duration-300 border-r",
        className,
      )}
      {...props}
    >
      {children}
    </aside>
  );
};
