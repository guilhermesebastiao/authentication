import { technologies } from "@/features/home/constants";

export const Technologies = () => {
  return (
    <section id="technologies" className="scroll-mt-8">
      <h2 className="border-b pb-2 text-2xl font-semibold tracking-tight">Tecnologias</h2>
      <div className="mt-4 overflow-x-auto rounded-md border">
        <table className="w-full min-w-110 border-collapse text-left">
          <thead className="bg-card text-[13px] text-muted-foreground">
            <tr>
              <th className="px-4 py-2 font-medium">Responsabilidade</th>
              <th className="px-4 py-2 font-medium">Tecnologias</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {technologies.map(([category, items]) => (
              <tr key={category}>
                <th scope="row" className="px-4 py-3 text-sm font-medium">
                  {category}
                </th>
                <td className="px-4 py-3 text-sm text-muted-foreground">{items}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-3 text-[13px] leading-5 text-muted-foreground">
        A persistência e a infraestrutura da API não estão definidas neste repositório.
      </p>
    </section>
  );
};
