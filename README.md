# Authentication

## Apresentação

**Authentication** é uma aplicação web para autenticação e gestão de contas. Seu objetivo é oferecer uma interface para cadastro, acesso e manutenção de contas, delegando a validação de identidade e a persistência dos dados a uma API externa.

## Visão geral

O sistema reúne páginas públicas de entrada e recuperação de conta e uma área protegida para a pessoa autenticada. Foi desenvolvido para usuários que precisam criar e acessar uma conta, além de consultar as configurações de segurança e as sessões ativas.

As rotas públicas incluem `/sign-in`, `/sign-up`, `/account-activation/:activationToken`, `/forgot-password`, `/forgot-password/validate/:forgotToken` e `/recovery-password/reset/:recoveryToken`. A área autenticada inclui a página inicial (`/`) e as configurações (`/settings`).

## Funcionalidades

### Autenticação e cadastro

- Cadastro de conta por e-mail e senha.
- Login com e-mail e senha.
- Login com Google por OAuth.
- Encerramento de sessão.

### Ativação e recuperação de conta

- Ativação de conta por token recebido por e-mail.
- Reenvio do e-mail de ativação.
- Solicitação de recuperação, validação do token e reenvio do e-mail.
- Redefinição de senha a partir do token de recuperação.

### Conta e segurança

- Consulta dos dados da conta autenticada.
- Alteração de senha.
- Desativação da conta.
- Listagem paginada e revogação de sessões.

## Fluxos principais

### Login e proteção de páginas

1. A interface envia as credenciais para uma rota interna do Next.js (`/api/auth/sign-in`) ou, no login Google, para `/api/auth/google/sign-in`.
2. O Route Handler encaminha a requisição à API externa e, quando a autenticação é bem-sucedida, grava os tokens de autenticação em cookies.
3. O proxy do Next.js permite o acesso às páginas públicas sem sessão e redireciona páginas protegidas para `/sign-in` quando faltam tokens.
4. Em páginas protegidas, o proxy verifica a validade do access token. Se estiver expirado, tenta renová-lo usando o refresh token; se a renovação falhar, remove os cookies e redireciona para o login.

### Cadastro e ativação

1. O formulário envia os dados para `/api/auth/sign-up`.
2. A API externa processa o cadastro e inicia o fluxo de ativação.
3. O link de ativação abre `/account-activation/:activationToken`; a página valida o token através da rota interna correspondente. Também é possível solicitar o reenvio da mensagem.

### Recuperação de senha

1. A pessoa informa o e-mail em `/forgot-password`; a aplicação solicita o envio da mensagem de recuperação.
2. O link recebido abre `/forgot-password/validate/:forgotToken` para validar o pedido.
3. Com o token de recuperação, a pessoa define uma nova senha em `/recovery-password/reset/:recoveryToken`.

### Sessões

Na área de configurações, a aplicação carrega a lista paginada de sessões da conta. A pessoa pode revogar uma sessão específica; essa operação é encaminhada à API externa. Alterar senha e desativar a conta também são ações disponíveis nas configurações de segurança.

## Arquitetura

O projeto usa o App Router do Next.js e separa a interface por funcionalidades. O caminho principal de uma operação é:

```text
Navegador → funcionalidades da interface → Route Handler do Next.js → API externa
                                      ↑
                            proxy protege as páginas
```

- `src/app`: páginas, layouts e rotas HTTP internas em `src/app/api`.
- `src/features`: código agrupado por domínio, com views, componentes, hooks, schemas e tipos.
- `src/shared`: componentes reutilizáveis, provedores, configuração, tipos e utilitários comuns.
- `public`: arquivos estáticos.

Os hooks no cliente chamam a API interna do Next.js. Os Route Handlers adicionam os cabeçalhos necessários, encaminham chamadas ao backend, traduzem erros e administram cookies de autenticação. O proxy protege páginas e tenta renovar tokens expirados.

## Tecnologias

| Tecnologia              | Responsabilidade                                          |
| ----------------------- | --------------------------------------------------------- |
| Next.js 16 e App Router | Páginas, layouts, Route Handlers e proxy de autenticação. |
| TypeScript              | Tipagem das páginas, formulários e integração com a API.  |
| Tailwind CSS 4          | Estilos e layout responsivo.                              |
| TanStack Query          | Estado assíncrono, consultas e mutações da API.           |
| React Hook Form e Zod   | Gerenciamento e validação de formulários.                 |
| `@react-oauth/google`   | Integração do fluxo de login com Google.                  |
| pnpm                    | Instalação de dependências e execução de scripts.         |

### Configuração e execução local

Pré-requisitos: Node.js compatível com a versão do Next.js usada no projeto, pnpm 11.1.3, acesso à API externa e um Client ID OAuth do Google.

1. Instale as dependências:

   ```bash
   pnpm install
   ```

2. Crie `.env` copiando `.env.example` (no PowerShell: `Copy-Item .env.example .env`) e configure:

   | Variável                       | Descrição                                 | Exemplo local                              |
   | ------------------------------ | ----------------------------------------- | ------------------------------------------ |
   | `NEXT_PUBLIC_API_URL`          | URL base da API externa, sem barra final. | `http://localhost:8080`                    |
   | `NEXT_PUBLIC_BASE_URL`         | URL base desta aplicação.                 | `http://localhost:3000`                    |
   | `NEXT_PUBLIC_GOOGLE_CLIENT_ID` | Client ID OAuth do Google.                | `seu-client-id.apps.googleusercontent.com` |

   Todas as três variáveis são obrigatórias. Configure a origem autorizada do OAuth para o ambiente usado.

3. Inicie o servidor de desenvolvimento e acesse `http://localhost:3000`:

   ```bash
   pnpm dev
   ```

Para gerar e iniciar uma build de produção, use `pnpm build` e `pnpm start`. Outros comandos disponíveis: `pnpm lint`, `pnpm lint:fix`, `pnpm format` e `pnpm format:check`.

## API e integrações

O frontend comunica-se com a API externa usando Route Handlers locais em `/api`. A tabela relaciona as rotas locais e os métodos implementados aos endpoints do backend. `{activationToken}`, `{forgotToken}`, `{recoverToken}` e `{sessionId}` representam parâmetros de rota. Os métodos indicados são os usados entre o Next.js e a API externa.

| Rota local                                  | Método   | Endpoint na API externa                 | Uso                                                       |
| ------------------------------------------- | -------- | --------------------------------------- | --------------------------------------------------------- |
| `/api/auth/sign-in`                         | `POST`   | `/auth/sign-in`                         | Login por credenciais.                                    |
| `/api/auth/sign-up`                         | `POST`   | `/auth/sign-up`                         | Cadastro.                                                 |
| `/api/auth/google/sign-in`                  | `POST`   | `/auth/google/sign-in`                  | Login Google.                                             |
| `/api/auth/sign-out`                        | `POST`   | `/auth/sign-out`                        | Encerramento de sessão.                                   |
| _(proxy de páginas)_                        | `POST`   | `/auth/refresh`                         | Renovação de tokens expirados.                            |
| `/api/account-activation`                   | `POST`   | `/account-activation`                   | Solicitação de ativação.                                  |
| `/api/account-activation/{activationToken}` | `GET`    | `/account-activation/{activationToken}` | Consulta/validação do token de ativação.                  |
| `/api/account-activation/resend`            | `POST`   | `/account-activation/resend`            | Reenvio do e-mail de ativação.                            |
| `/api/forgot-password`                      | `POST`   | `/forgot-password`                      | Solicitação de recuperação.                               |
| `/api/forgot-password/{forgotToken}`        | `GET`    | `/forgot-password/{forgotToken}`        | Consulta do pedido de recuperação.                        |
| `/api/forgot-password/validate`             | `POST`   | `/forgot-password/validate`             | Validação do pedido.                                      |
| `/api/forgot-password/resend`               | `POST`   | `/forgot-password/resend`               | Reenvio do e-mail de recuperação.                         |
| `/api/recovery-password/{recoverToken}`     | `GET`    | `/recovery-password/{recoverToken}`     | Consulta do token de recuperação.                         |
| `/api/recovery-password`                    | `PATCH`  | `/recovery-password/reset`              | Redefinição de senha.                                     |
| `/api/accounts/me`                          | `GET`    | `/accounts/me`                          | Consulta da conta autenticada.                            |
| `/api/accounts/me`                          | `DELETE` | `/accounts/me`                          | Desativação da conta.                                     |
| `/api/accounts/me/password`                 | `PATCH`  | `/accounts/me/password`                 | Alteração de senha.                                       |
| `/api/sessions`                             | `GET`    | `/sessions`                             | Listagem de sessões; encaminha os parâmetros de consulta. |
| `/api/sessions/{sessionId}`                 | `DELETE` | `/sessions/{sessionId}`                 | Revogação de sessão.                                      |

O contrato detalhado de payloads e respostas pertence ao backend; os tipos e schemas usados pela interface estão em `src/features/*/types` e `src/features/*/schemas`. A integração Google usa o fluxo de código de autorização; a troca do código e a autenticação final são feitas pela API externa. O projeto não inclui o backend nem define sua persistência ou infraestrutura.
