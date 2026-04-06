import { CheckIcon } from "@radix-ui/react-icons";
const plans = [
  {
    title: "Free",
    price: "0€",
    features: [
      "Accès limité aux fonctionnalités",
      "Support communautaire",
      "Idéal pour les projets personnels ou les tests",
    ],
    cta: "Commencer gratuitement",
    href: "/signup?plan=free",
  },
  {
    title: "Pro",
    price: "29€/mois",
    features: [
      "Accès complet à toutes les fonctionnalités",
      "Support prioritaire",
      "Idéal pour les petites entreprises et les projets professionnels",
    ],
    cta: "Essayer Pro",
    href: "/signup?plan=pro",
  },
  {
    title: "Entreprise",
    price: "Contactez-nous",
    features: [
      "Solutions personnalisées pour les grandes entreprises",
      "Support dédié",
      "Idéal pour les organisations avec des besoins spécifiques",
    ],
    cta: "Contactez-nous",
    href: "/contact?plan=enterprise",
  },
];

export default function PricingPage() {
  return (
    <div className="flex flex-col gap-8 text-zinc-900">
      <h1 className="text-3xl font-bold">Choisissez votre plan</h1>
      <p className="text-lg text-muted-foreground">
        Commencez avec notre plan gratuit, ou passez à un plan pro pour accéder
        à toutes les fonctionnalités.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
        {plans.map((plan) => {
          const isPro = plan.title === "Pro";
          return (
            <div
              key={plan.title}
              className={`relative rounded-2xl p-6 flex flex-col items-center text-center transition-all ${
                isPro
                  ? "border-2 border-violet-500 bg-white shadow-[0_0_40px_8px_rgba(139,92,246,0.25)] scale-105"
                  : "border border-zinc-200 bg-white"
              }`}
            >
              {isPro && (
                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-violet-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                  Recommandé
                </span>
              )}
              <h2 className="text-2xl font-bold">{plan.title}</h2>
              <p className="text-3xl font-bold my-4">{plan.price}</p>
              <ul className="space-y-2 mb-6">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <CheckIcon className="w-5 h-5 text-green-500 mr-2" />
                    {feature}
                  </li>
                ))}
              </ul>
              <a
                href={plan.href}
                className={`p-3 rounded-2xl text-sm font-medium transition-colors focus:ring-2 focus:outline-none ${
                  isPro
                    ? "bg-violet-500 text-white hover:bg-violet-600 focus:ring-violet-400"
                    : "bg-zinc-500 text-zinc-100 hover:bg-zinc-800 focus:ring-zinc-400"
                }`}
              >
                {plan.cta}
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
}
