"use client";

import { useRouter } from "next/navigation";
import { useTimer } from "react-timer-hook";
import { useEffect } from "react";

type ContentInfoProps = {
  email: string;
  expiresAt: string;
};

export const ContentInfo = ({ email, expiresAt }: ContentInfoProps) => {
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
    <div className="space-y-1">
      <p className="text-sm text-muted-foreground">
        Código enviado para <strong className="text-foreground">{email}</strong>
      </p>
      <p className="text-sm text-muted-foreground">
        O código expira em{" "}
        <strong className="text-foreground">
          {hours > 0 && `${hours}h `}
          {minutes}m {String(seconds).padStart(2, "0")}s
        </strong>
      </p>
    </div>
  );
};
