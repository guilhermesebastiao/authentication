export const Overview = () => {
  return (
    <section id="overview" className="scroll-mt-8">
      <h2 className="border-b pb-2 text-2xl font-semibold tracking-tight">Visão geral</h2>
      <p className="mt-4">
        O projeto reúne fluxos de autenticação e autocuidado de conta: cadastro, acesso, ativação,
        recuperação de senha e gerenciamento de sessões. A interface é a camada responsável por
        conduzir esses fluxos e se comunicar com um serviço de identidade externo.
      </p>
      <blockquote className="mt-4 border-l-2 border-primary pl-4 text-muted-foreground">
        A implementação prioriza a separação por domínio, validação explícita dos dados e tratamento
        consistente das respostas da API.
      </blockquote>
    </section>
  );
};
