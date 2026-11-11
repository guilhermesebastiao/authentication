"use client";

import { SessionPagination } from "@/features/settings/components/sessions/session-pagination";
import { ErrorComponent } from "@/features/settings/components/sessions/error-component";
import { EmptyComponent } from "@/features/settings/components/sessions/empty-component";
import { SettingHeader } from "@/features/settings/components/setting-header";
import { useGetSessions } from "@/features/sessions/hooks/use-get-sessions";
import { Session } from "@/features/settings/components/sessions/session";
import { AsyncBoundary } from "@/shared/components/async-boundary";
import { useState } from "react";

export const Sessions = () => {
  const [query, setQuery] = useState({ page: 1, size: 5 });

  const { getSessions } = useGetSessions(query);

  const onSetPage = (page: number) => {
    setQuery((prev) => ({
      ...prev,
      page,
    }));
  };

  return (
    <section>
      <SettingHeader
        title="Sessões Ativas"
        description="Monitore e gerencie os navegadores, dispositivos móveis e aplicativos que estão conectados
        na sua conta."
      />
      <AsyncBoundary
        query={getSessions}
        isEmpty={({ results }) => results.length <= 0}
        errorComponent={ErrorComponent}
        emptyComponent={EmptyComponent}
      >
        {({ results, ...pagination }) => (
          <div className="space-y-2.5">
            {results.map((session) => (
              <Session key={session.id} data={session} />
            ))}
            <SessionPagination pagination={pagination} onPageChange={onSetPage} />
          </div>
        )}
      </AsyncBoundary>
    </section>
  );
};
