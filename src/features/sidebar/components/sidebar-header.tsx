"use client";

import Icon from "@/shared/assets/icon.svg";
import { redirect } from "next/navigation";
import Image from "next/image";

export const SidebarHeader = () => {
  const handleGoHome = () => {
    redirect("/");
  };

  return (
    <header className="flex items-center justify-center aspect-square border-b">
      <Image
        src={Icon}
        alt="site-logo"
        width={30}
        className="cursor-pointer"
        onClick={handleGoHome}
      />
    </header>
  );
};
