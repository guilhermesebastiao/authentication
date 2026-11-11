import {
  AtSign,
  KeyRound,
  MailCheck,
  MonitorSmartphone,
  ShieldCheck,
  UserRound,
} from "lucide-react";

export const sections = [
  ["overview", "Visão geral"],
  ["architecture", "Arquitetura"],
  ["features", "Funcionalidades"],
  ["technologies", "Tecnologias"],
  ["decisions", "Decisões técnicas"],
];

export const features = [
  {
    icon: UserRound,
    title: "Contas e acesso",
    description: "Cadastro e login com e-mail e senha, além de autenticação com Google.",
  },
  {
    icon: MailCheck,
    title: "Ativação de conta",
    description: "Confirmação por e-mail e reenvio da mensagem de ativação.",
  },
  {
    icon: KeyRound,
    title: "Recuperação de senha",
    description: "Solicitação, validação e redefinição de senha.",
  },
  {
    icon: MonitorSmartphone,
    title: "Sessões ativas",
    description: "Consulta paginada e revogação de sessões por dispositivo.",
  },
  {
    icon: ShieldCheck,
    title: "Segurança da conta",
    description: "Alteração de senha e opção para desativar a própria conta.",
  },
  {
    icon: AtSign,
    title: "Integração com API",
    description: "Rotas do Next.js encaminham operações de identidade à API configurada.",
  },
];

export const technologies = [
  ["Aplicação", "Next.js 16 · TypeScript"],
  ["Interface", "Tailwind CSS 4 · componentes shadcn · Lucide"],
  ["Formulários", "React Hook Form · Zod"],
  ["Dados e identidade", "TanStack Query · Google OAuth · jose"],
  ["Integração", "Next.js Route Handlers · API externa"],
];

export const decisions = [
  {
    title: "Rotas proxy no servidor",
    description:
      "Route Handlers encaminham chamadas à API e centralizam cabeçalhos, respostas e tratamento de erros no Next.js.",
  },
  {
    title: "Tokens em cookies protegidos",
    description:
      "Os tokens de acesso, renovação e sessão usam HttpOnly e SameSite=Lax; Secure é aplicado em produção.",
  },
  {
    title: "Validação declarativa",
    description:
      "Schemas Zod definem os formatos aceitos e se integram aos formulários para apresentar erros junto aos campos.",
  },
  {
    title: "Organização por funcionalidade",
    description:
      "Views, hooks, schemas e tipos ficam agrupados por domínio, com componentes comuns em uma camada compartilhada.",
  },
];
