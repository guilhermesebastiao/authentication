"use client";

import { BaseEmpty } from "@/shared/components/base-empty";
import { BaseError } from "@/shared/components/base-error";
import { Spinner } from "@/shared/components/ui/spinner";
import { HttpError } from "@/shared/lib/http/http-error";
import { UseQueryResult } from "@tanstack/react-query";
import React from "react";

type AsyncBoundaryProps<T> = {
  query: UseQueryResult<T, HttpError>;
  errorComponent?: React.ComponentType<{ error: HttpError; onRefetch?: () => void }>;
  emptyComponent?: React.ComponentType<{ onRefetch?: () => void }>;
  isEmpty?: (data: T) => boolean;
  children: (data: T) => React.ReactNode;
};

export function AsyncBoundary<T>({
  query,
  errorComponent: ErrorComponent,
  emptyComponent: EmptyComponent,
  isEmpty,
  children,
}: AsyncBoundaryProps<T>) {
  if (query.isLoading || query.isRefetching) {
    return <Spinner className="mx-auto my-auto" />;
  }

  if (query.error) {
    return ErrorComponent ? (
      <ErrorComponent error={query.error} onRefetch={() => query.refetch()} />
    ) : (
      <BaseError error={query.error} />
    );
  }

  if (!query.isSuccess) {
    return null;
  }

  if (isEmpty?.(query.data)) {
    return EmptyComponent ? (
      <EmptyComponent onRefetch={() => query.refetch()} />
    ) : (
      <BaseEmpty
        title="Nenhum resultado encontrado"
        description="Não há informações disponíveis para exibir no momento."
      />
    );
  }

  return <React.Fragment>{children(query.data)}</React.Fragment>;
}
