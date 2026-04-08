"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { useState, useEffect } from "react";

const navItems = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Settings", href: "/settings" },
  { label: "Pricing", href: "/pricing" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/login");
  }

  return (
    <aside className="w-56 h-screen flex flex-col bg-zinc-900 text-white">
      <div className="px-6 py-5 text-lg font-bold border-b border-zinc-700">
        SaaS Starter
      </div>
      <nav className="flex-1 flex flex-col gap-1 p-4">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`px-4 py-2 rounded-md text-sm transition-colors ${
              mounted && pathname === item.href
                ? "bg-zinc-700 text-white"
                : "text-zinc-400 hover:bg-zinc-800 hover:text-white"
            }`}
          >
            {item.label}
          </Link>
        ))}
      </nav>
      <div className="p-4 border-t border-zinc-700">
        <button
          onClick={handleLogout}
          className="w-full px-4 py-2 text-sm text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-md transition-colors text-left"
        >
          Se déconnecter
        </button>
      </div>
    </aside>
  );
}
