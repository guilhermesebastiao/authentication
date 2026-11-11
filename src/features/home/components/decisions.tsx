import { decisions } from "@/features/home/constants";

export const Decisions = () => {
  return (
    <section id="decisions" className="scroll-mt-8">
      <h2 className="border-b pb-2 text-2xl font-semibold tracking-tight">Decisões técnicas</h2>
      <div className="mt-4 space-y-5">
        {decisions.map(({ title, description }) => (
          <div key={title}>
            <h3 className="font-semibold">{title}</h3>
            <p className="mt-1 text-muted-foreground">{description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};
