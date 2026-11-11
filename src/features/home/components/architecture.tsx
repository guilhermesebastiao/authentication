type ArchitectureItem = [label: string, detail: string];

const data: ArchitectureItem[] = [
  ["Navegador", "interação"],
  ["Funcionalidades", "views · hooks · schemas"],
  ["Next.js", "proxy · Route Handlers"],
  ["API externa", "identidade e sessões"],
];

export const Architecture = () => {
  return (
    <section id="architecture" className="scroll-mt-8">
      <h2 className="border-b pb-2 text-2xl font-semibold tracking-tight">Arquitetura</h2>
      <p className="mt-4">
        A aplicação usa Next.js App Router e organiza a lógica por funcionalidades. Os Route
        Handlers formam a camada de integração entre o cliente e a API externa.
      </p>
      <div className="mt-5 overflow-x-auto rounded-md border p-4 sm:p-5">
        <div className="flex min-w-130 items-stretch gap-2 font-mono text-xs">
          {data.map(([label, detail], index) => (
            <div key={label} className="flex flex-1 items-center gap-2">
              <div className="min-w-0 flex-1 rounded border bg-card p-3">
                <p className="font-semibold text-primary">{label}</p>
                <p className="mt-1 text-[10px] leading-4 text-muted-foreground">{detail}</p>
              </div>
              {index < 3 && <span className="text-muted-foreground">→</span>}
            </div>
          ))}
        </div>
      </div>
      <ul className="mt-5 list-disc space-y-2 pl-5 marker:text-muted-foreground">
        <li>
          <code className="rounded bg-foreground/5 border px-1.5 py-0.5 text-primary mr-1">
            features/
          </code>{" "}
          agrupa views, hooks, schemas e tipos por domínio.
        </li>
        <li>
          <code className="rounded bg-foreground/5 border px-1.5 py-0.5 text-primary mr-1">
            shared/
          </code>{" "}
          concentra provedores, componentes reutilizáveis, utilitários e tipos comuns.
        </li>
        <li>
          <code className="rounded bg-foreground/5 border px-1.5 py-0.5 text-primary mr-1">
            app/api/
          </code>{" "}
          contém os Route Handlers que encaminham operações e normalizam respostas e erros.
        </li>
      </ul>
    </section>
  );
};
