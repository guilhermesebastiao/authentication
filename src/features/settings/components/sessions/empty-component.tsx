import { BaseEmpty } from "@/shared/components/base-empty";
import { Button } from "@/shared/components/ui/button";

type EmptyComponentProps = {
  onRefetch?: () => void;
};

export const EmptyComponent = ({ onRefetch }: EmptyComponentProps) => {
  return (
    <BaseEmpty
      title="Nenhuma sessão encontrada"
      description="Não há sessões ativas para exibir no momento."
    >
      <Button variant="secondary" onClick={() => onRefetch?.()}>
        Procurar novamente
      </Button>
    </BaseEmpty>
  );
};
