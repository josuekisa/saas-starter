import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col">
      {/* Nav */}
      <nav className="flex items-center justify-between px-8 py-5 border-b border-white/5">
        <span className="text-lg font-semibold tracking-tight">
          SaaS Starter ⚡
        </span>
        <div className="flex items-center gap-3">
          <Link href="/login" className="btn-ghost text-sm">
            Connexion
          </Link>
          <Link href="/register" className="btn-primary text-sm">
            Commencer gratuitement
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="flex-1 flex flex-col items-center justify-center text-center px-4 py-24 gap-6">
        <div className="inline-flex items-center gap-2 bg-brand-500/10 border border-brand-500/20 text-brand-500 text-xs font-medium px-3 py-1.5 rounded-full">
          ✦ Next.js 14 · Supabase · TypeScript
        </div>
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter max-w-3xl leading-none">
          Lance ton SaaS{" "}
          <span className="text-brand-500">sans perdre de temps</span>
        </h1>
        <p className="text-gray-400 text-lg max-w-xl leading-relaxed">
          Auth complète, dashboard protégé, settings utilisateur. Tout est prêt.
          Concentre-toi sur ta vraie feature.
        </p>
        <div className="flex items-center gap-4 mt-4">
          <Link href="/register" className="btn-primary px-6 py-3 text-base">
            Créer un compte →
          </Link>
          <a
            href="https://github.com/josuekisa"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost px-6 py-3 text-base"
          >
            GitHub
          </a>
        </div>
      </section>

      {/* Features */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4 px-8 pb-24 max-w-5xl mx-auto w-full">
        {[
          {
            icon: "🔐",
            title: "Auth complète",
            desc: "Email/password + OAuth Google & GitHub via Supabase",
          },
          {
            icon: "🛡️",
            title: "Routes protégées",
            desc: "Middleware Next.js qui redirige si non connecté",
          },
          {
            icon: "⚡",
            title: "Prêt à déployer",
            desc: "Config Vercel incluse, variables d'env documentées",
          },
        ].map((f) => (
          <div key={f.title} className="card flex flex-col gap-3">
            <span className="text-2xl">{f.icon}</span>
            <h3 className="font-semibold text-white">{f.title}</h3>
            <p className="text-gray-400 text-sm leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </section>
    </main>
  );
}
