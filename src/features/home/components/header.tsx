export const Header = () => {
  return (
    <header className="border-b pb-6">
      <h1 className="text-3xl font-semibold tracking-tight">Authentication</h1>
      <p className="mt-3 max-w-3xl text-base leading-7 text-muted-foreground">
        Aplicação web para autenticação e gerenciamento de contas, com fluxos organizados por
        domínio e integrados a uma API externa.
      </p>
      <div className="mt-5 flex flex-wrap gap-2 text-xs">
        {["Next.js 16", "TypeScript", "App Router"].map((item) => (
          <span
            key={item}
            className="rounded-md border border-accent bg-card font-medium px-2.5 py-1 text-muted-foreground"
          >
            {item}
          </span>
        ))}
      </div>
    </header>
  );
};
