import { SettingsBaseHeader } from "@/features/settings/components/setting-base-header";
import { DangerZone } from "@/features/settings/components/danger-zone";
import { Sessions } from "@/features/settings/components/sessions";
import { Security } from "@/features/settings/components/security";

export const SettingsView = () => {
  return (
    <main className="max-w-3xl w-full mx-auto px-5 py-8 sm:px-8 sm:py-12">
      <SettingsBaseHeader />
      <div className="space-y-5">
        <Sessions />
        <Security />
        <DangerZone />
      </div>
    </main>
  );
};
