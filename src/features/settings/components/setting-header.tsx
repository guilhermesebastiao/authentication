type SettingHeaderProps = {
  title: string;
  description: string;
};

export const SettingHeader = ({ title, description }: SettingHeaderProps) => {
  return (
    <header className="space-y-1.5 my-3">
      <h2 className="text-base">{title}</h2>
      <p className="text-sm text-muted-foreground">{description}</p>
    </header>
  );
};
