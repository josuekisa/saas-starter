import StatCard from "@/components/ui/StatCard";

const stats = [
  { title: "Revenus ce mois", value: "€4 200", description: "+12% vs mois dernier" },
  { title: "Utilisateurs actifs", value: "1 340", description: "+5% vs mois dernier" },
  { title: "Nouvelles inscriptions", value: "84", description: "Ces 30 derniers jours" },
  { title: "Taux de rétention", value: "91%", description: "+2% vs mois dernier" },
];

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-2xl font-bold text-zinc-900">Dashboard</h1>
        <p className="text-sm text-zinc-500 mt-1">Bienvenue sur votre espace.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </div>
    </div>
  );
}
