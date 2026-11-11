import { DEFAULT_NAV_LINKS } from "@/features/sidebar/constants";
import { Sidebar } from "@/features/sidebar/components";

export default function ProtectedLayout({ children }: LayoutProps<"/">) {
  return (
    <main className="flex h-dvh w-full overflow-hidden">
      <Sidebar.Root>
        <Sidebar.Header />
        <Sidebar.Navigation>
          {DEFAULT_NAV_LINKS.map((data, index) => (
            <Sidebar.NavLink key={index} data={data} />
          ))}
        </Sidebar.Navigation>
        <Sidebar.Footer />
      </Sidebar.Root>
      <section className="min-w-0 flex-1 flex flex-col overflow-y-auto">{children}</section>
    </main>
  );
}
