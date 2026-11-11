type PublicHeaderProps = {
  title: string;
  description: string;
};

export const PublicHeader = ({ title, description }: PublicHeaderProps) => {
  return (
    <header className="space-y-2">
      <h1 className="text-2xl font-medium">{title}</h1>
      <p className="text-sm text-muted-foreground">{description}</p>
    </header>
  );
};
