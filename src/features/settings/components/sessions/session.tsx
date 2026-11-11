import { RevokeDeviceDialog } from "@/features/settings/components/sessions/revoke-device-dialog";
import { LogOut, Monitor, Tablet, Smartphone, TabletSmartphone } from "lucide-react";
import { DeviceType, SessionResponse } from "@/features/sessions/types";
import { Button } from "@/shared/components/ui/button";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { twMerge } from "cn";

type SessionProps = {
  data: SessionResponse;
};

export const Session = ({ data }: SessionProps) => {
  const handleFormatDistanceToNow = (date: string) => {
    return formatDistanceToNow(new Date(date), {
      addSuffix: true,
      locale: ptBR,
    });
  };

  return (
    <div
      className={twMerge(
        "grid grid-cols-[auto_1fr_auto] items-center gap-3 px-4 py-3 bg-foreground/2 rounded-md border",
        data.isCurrent && "border-primary/25 bg-primary/7",
      )}
    >
      <div
        className={twMerge(
          "size-8.5 rounded-md bg-foreground/5 border flex justify-center items-center p-1.5",
          data.isCurrent && "border-primary/35 bg-background/10",
        )}
      >
        {RenderIcon(data.type, data.isCurrent)}
      </div>
      <div className="space-y-1">
        <h3 className="text-[15px]">{data.name}</h3>
        <p className="text-sm text-muted-foreground font-medium">{GetName(data.type)}</p>
      </div>
      {!data.isCurrent && (
        <div className="col-start-3 row-span-2 row-start-1 flex items-center justify-center">
          <RevokeDeviceDialog sessionId={data.id}>
            <Button type="button" variant="destructive" size="icon">
              <LogOut />
            </Button>
          </RevokeDeviceDialog>
        </div>
      )}
      <div className="col-start-2">
        <div className="flex items-center gap-1">
          <span className="text-[13px] text-muted-foreground">{data.location}</span>
          <span>&sdot;</span>
          {data.isCurrent ? (
            <span className="text-[13px] text-primary">Sessão Atual</span>
          ) : (
            <span className="text-[13px] text-muted-foreground">
              {handleFormatDistanceToNow(data.lastSeenAt)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

const GetName = (type: DeviceType) => {
  if (type === DeviceType.DESKTOP) {
    return "Computador/Notebook";
  }

  if (type === DeviceType.TABLET) {
    return "Tablet";
  }

  if (type === DeviceType.MOBILE) {
    return "Celular";
  }

  if (type === DeviceType.OTHER) {
    return "Outro dispositivo";
  }
};

const RenderIcon = (type: DeviceType, isCurrent: boolean) => {
  const className = twMerge("text-muted-foreground", isCurrent && "text-primary");

  if (type === DeviceType.DESKTOP) {
    return <Monitor className={className} />;
  }

  if (type === DeviceType.TABLET) {
    return <Tablet className={className} />;
  }

  if (type === DeviceType.MOBILE) {
    return <Smartphone className={className} />;
  }

  if (type === DeviceType.OTHER) {
    return <TabletSmartphone className={className} />;
  }
};
