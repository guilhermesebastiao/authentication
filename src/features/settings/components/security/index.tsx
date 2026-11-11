import { ChangePasswordDialog } from "@/features/settings/components/security/change-password-dialog";
import { SettingHeader } from "@/features/settings/components/setting-header";
import { Button } from "@/shared/components/ui/button";

export const Security = () => {
  return (
    <section className="space-y-4">
      <SettingHeader
        title="Segurança"
        description=" Mantenha sua conta segura atualizando sua senha regularmente e protegendo suas informações
        pessoais contra acessos não autorizados."
      />
      <ChangePasswordDialog>
        <Button variant="outline" className="w-full">
          Alterar senha
        </Button>
      </ChangePasswordDialog>
    </section>
  );
};
