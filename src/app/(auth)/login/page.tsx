"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { FaGithub } from "react-icons/fa";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const supabase = createClient();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      setError("Email ou mot de passe incorrect.");
      setLoading(false);
    } else {
      router.push("/dashboard");
    }
  }

  async function signInWithGithub() {
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback`,
      },
    });
    if (error) {
      setError("Erreur lors de la connexion avec GitHub.");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-950 px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-white">Connexion</h1>
          <p className="text-zinc-400 text-sm mt-2">Bon retour parmi nous</p>
        </div>

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm text-zinc-300">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="toi@exemple.com"
              required
              className="bg-zinc-900 border border-zinc-700 text-white placeholder-zinc-500 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-500"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm text-zinc-300">Mot de passe</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="bg-zinc-900 border border-zinc-700 text-white placeholder-zinc-500 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-500"
            />
          </div>

          {error && (
            <p className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-2.5">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-2 bg-white text-zinc-900 font-semibold rounded-lg px-4 py-2.5 text-sm hover:bg-zinc-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Connexion..." : "Se connecter"}
          </button>
          <button
            type="button"
            onClick={signInWithGithub}
            className="mt-2 w-full flex items-center justify-center gap-2 bg-zinc-800 text-white font-semibold rounded-lg px-4 py-2.5 text-sm hover:bg-zinc-600 transition-colors"
          >
            <FaGithub className="text-base" />
            Se connecter avec GitHub
          </button>
        </form>

        <p className="text-center text-zinc-500 text-sm mt-6">
          Pas encore de compte ?{" "}
          <Link href="/register" className="text-white hover:underline">
            S&apos;inscrire
          </Link>
        </p>
      </div>
    </div>
  );
}
