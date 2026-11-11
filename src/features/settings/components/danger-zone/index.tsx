import { DisableAccountDialog } from "@/features/settings/components/danger-zone/disable-account-dialog";
import { SettingHeader } from "@/features/settings/components/setting-header";
import { Button } from "@/shared/components/ui/button";

export const DangerZone = () => {
  return (
    <section className="space-y-4">
      <SettingHeader
        title="Zona de Perigo"
        description="Exclua permanentemente sua conta e todos os dados associados a ela. Esta ação é irreversível
        e não poderá ser desfeita."
      />
      <DisableAccountDialog>
        <Button variant="destructive" className="w-full">
          Excluir minha conta
        </Button>
      </DisableAccountDialog>
    </section>
  );
};
