"use client";

import { useTimer } from "react-timer-hook";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

type ContentResetInfoProps = {
  email: string;
  expiresAt: string;
};

export const ContentResetInfo = ({ email, expiresAt }: ContentResetInfoProps) => {
  const { totalSeconds, seconds, minutes, hours } = useTimer({
    expiryTimestamp: new Date(expiresAt),
    autoStart: true,
  });

  const router = useRouter();

  useEffect(() => {
    if (totalSeconds <= 0) {
      router.push("/sign-in");
    }
  }, [totalSeconds, router]);

  return (
    <div className="space-y-1.5">
      <p className="text-sm text-muted-foreground">
        Redefinição de senha para <strong className="text-foreground/85">{email}</strong>
      </p>
      <p className="text-sm text-muted-foreground">
        A redefinição de senha expira em{" "}
        <strong className="text-foreground/85">
          {hours > 0 && `${hours}h `}
          {minutes}m {String(seconds).padStart(2, "0")}s
        </strong>
      </p>
    </div>
  );
};
