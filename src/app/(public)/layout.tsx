export default function PublicLayout({ children }: LayoutProps<"/">) {
  return (
    <main className="flex h-dvh w-full overflow-hidden">
      <section className="min-w-0 flex-1 flex overflow-y-auto">{children}</section>
    </main>
  );
}
