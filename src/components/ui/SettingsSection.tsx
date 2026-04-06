interface SettingsSectionProps {
  title: string;
  description: string;
  children: React.ReactNode;
  danger?: boolean;
}

export default function SettingsSection({
  title,
  description,
  children,
  danger = false,
}: SettingsSectionProps) {
  return (
    <div
      className={`rounded-xl border p-6 flex flex-col gap-6 ${
        danger ? "border-red-500/30 bg-red-500/5" : "border-zinc-200 bg-white"
      }`}
    >
      <div>
        <h2
          className={`font-semibold text-base ${
            danger ? "text-red-500" : "text-zinc-900"
          }`}
        >
          {title}
        </h2>
        <p className="text-sm text-zinc-500 mt-1">{description}</p>
      </div>
      {children}
    </div>
  );
}
