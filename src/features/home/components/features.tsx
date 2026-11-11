import { features } from "@/features/home/constants";

export const Features = () => {
  return (
    <section id="features" className="scroll-mt-8">
      <h2 className="border-b pb-2 text-2xl font-semibold tracking-tight">Funcionalidades</h2>
      <div className="mt-4 divide-y divide-border rounded-md border">
        {features.map(({ icon: Icon, title, description }) => (
          <div key={title} className="flex gap-3 px-4 py-3.5">
            <Icon className="mt-1.75 size-4 shrink-0 text-primary" />
            <div>
              <h3 className="font-medium">{title}</h3>
              <p className="mt-0.5 text-sm leading-6 text-muted-foreground">{description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
