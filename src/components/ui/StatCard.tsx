interface StatCardProps {
  title: string;
  value: string;
  description: string;
}

export default function StatCard({ title, value, description }: StatCardProps) {
  return (
    <div className="bg-white rounded-xl border border-zinc-200 p-6 flex flex-col gap-1">
      <p className="text-sm text-zinc-500">{title}</p>
      <p className="text-3xl font-bold text-zinc-900">{value}</p>
      <p className="text-xs text-zinc-400">{description}</p>
    </div>
  );
}
