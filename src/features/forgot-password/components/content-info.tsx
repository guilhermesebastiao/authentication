"use client";

import { useTimer } from "react-timer-hook";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

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
    <div className="space-y-1.5">
      <p className="text-sm text-muted-foreground">
        Código enviado para <strong className="text-foreground/85">{email}</strong>
      </p>
      <p className="text-sm text-muted-foreground">
        {totalSeconds > 0 && (
          <React.Fragment>
            O código expira em{" "}
            <strong className="text-foreground/85">
              {hours > 0 && `${hours}h `}
              {minutes}m {String(seconds).padStart(2, "0")}s
            </strong>
          </React.Fragment>
        )}
      </p>
    </div>
  );
};
