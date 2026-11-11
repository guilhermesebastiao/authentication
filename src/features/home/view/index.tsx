import { Technologies } from "@/features/home/components/technologies";
import { Architecture } from "@/features/home/components/architecture";
import { Decisions } from "@/features/home/components/decisions";
import { Features } from "@/features/home/components/features";
import { Overview } from "@/features/home/components/overflow";
import { Header } from "@/features/home/components/header";
import { Aside } from "@/features/home/components/aside";

export const HomeView = () => {
  return (
    <main className="min-h-dvh">
      <div className="mx-auto max-w-5xl px-5 py-8 sm:px-8 sm:py-12">
        <Header />
        <div className="grid gap-10 pt-8 md:grid-cols-[190px_minmax(0,1fr)] md:gap-12">
          <Aside />
          <article className="min-w-0 space-y-10 text-sm leading-7">
            <Overview />
            <Architecture />
            <Features />
            <Technologies />
            <Decisions />
          </article>
        </div>
      </div>
    </main>
  );
};
