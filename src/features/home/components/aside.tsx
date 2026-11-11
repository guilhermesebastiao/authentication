import { sections } from "@/features/home/constants";

export const Aside = () => {
  return (
    <aside className="md:sticky md:top-6 md:self-start">
      <p className="mb-3 text-xs font-semibold uppercase tracking-wide">Nesta página</p>
      <nav aria-label="documentation-index" className="flex flex-wrap gap-2 md:flex-col">
        {sections.map(([id, label]) => (
          <a
            key={id}
            href={`#${id}`}
            className="rounded-md px-2 py-1.5 text-sm text-muted-foreground transition hover:text-foreground"
          >
            {label}
          </a>
        ))}
      </nav>
    </aside>
  );
};
