"use client";

import { useGetAccountActivation } from "@/features/account-activation/hooks/use-get-account-activation";
import { ErrorComponent } from "@/features/account-activation/components/error-component";
import { Content } from "@/features/account-activation/components/content";
import { AsyncBoundary } from "@/shared/components/async-boundary";

type AccountActivationViewProps = {
  activationToken: string;
};

export const AccountActivationView = ({ activationToken }: AccountActivationViewProps) => {
  const { getAccountActivation } = useGetAccountActivation({ activationToken });

  return (
    <AsyncBoundary query={getAccountActivation} errorComponent={ErrorComponent}>
      {(data) => <Content data={data} />}
    </AsyncBoundary>
  );
};
