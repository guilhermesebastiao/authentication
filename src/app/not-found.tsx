"use client";

import { Button } from "@/shared/components/ui/button";
import { redirect } from "next/navigation";

const NotFound = () => {
  const handleGoBack = () => {
    redirect("/");
  };

  return (
    <section className="flex flex-1 flex-col items-center justify-center gap-4">
      <h1 className="text-8xl text-center font-medium">404</h1>
      <p className="text-center text-neutral-400">ops, não há nada para ver aqui...</p>
      <Button variant="secondary" onClick={handleGoBack}>
        Voltar para início
      </Button>
    </section>
  );
};

export default NotFound;
