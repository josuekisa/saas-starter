"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import SettingsSection from "@/components/ui/SettingsSection";

interface Profile {
  id: string;
  first_name: string | null;
  last_name: string | null;
}

function Field({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
}: {
  label: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-zinc-700">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="bg-zinc-50 border border-zinc-200 text-zinc-900 placeholder-zinc-400 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-400"
      />
    </div>
  );
}

function Feedback({
  message,
  type,
}: {
  message: string;
  type: "success" | "error";
}) {
  return (
    <p
      className={`text-sm rounded-lg px-4 py-2.5 ${
        type === "success"
          ? "text-green-700 bg-green-50 border border-green-200"
          : "text-red-600 bg-red-50 border border-red-200"
      }`}
    >
      {message}
    </p>
  );
}

export default function SettingsPage() {
  const router = useRouter();

  const [profile, setProfile] = useState<Profile | null>(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [profileMsg, setProfileMsg] = useState<{
    text: string;
    type: "success" | "error";
  } | null>(null);
  const [profileLoading, setProfileLoading] = useState(false);

  const [, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMsg, setPasswordMsg] = useState<{
    text: string;
    type: "success" | "error";
  } | null>(null);
  const [passwordLoading, setPasswordLoading] = useState(false);

  const [deleteConfirm, setDeleteConfirm] = useState("");
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteMsg, setDeleteMsg] = useState<{
    text: string;
    type: "success" | "error";
  } | null>(null);

  useEffect(() => {
    async function load() {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;

      setEmail(user.email ?? "");

      const { data } = await supabase
        .from("profiles")
        .select("id, first_name, last_name")
        .eq("id", user.id)
        .single();

      if (data) {
        setProfile(data);
        setFirstName(data.first_name ?? "");
        setLastName(data.last_name ?? "");
      }
    }
    load();
  }, []);

  async function handleProfileSave(e: React.SyntheticEvent) {
    e.preventDefault();
    setProfileLoading(true);
    setProfileMsg(null);
    const supabase = createClient();

    const { error } = await supabase
      .from("profiles")
      .update({ first_name: firstName, last_name: lastName })
      .eq("id", profile!.id);

    if (error) {
      setProfileMsg({ text: "Erreur lors de la mise à jour.", type: "error" });
    } else {
      setProfileMsg({ text: "Profil mis à jour avec succès.", type: "success" });
    }
    setProfileLoading(false);
  }

  async function handlePasswordChange(e: React.SyntheticEvent) {
    e.preventDefault();
    setPasswordMsg(null);

    if (newPassword !== confirmPassword) {
      setPasswordMsg({
        text: "Les mots de passe ne correspondent pas.",
        type: "error",
      });
      return;
    }
    if (newPassword.length < 6) {
      setPasswordMsg({
        text: "Le mot de passe doit faire au moins 6 caractères.",
        type: "error",
      });
      return;
    }

    setPasswordLoading(true);
    const supabase = createClient();

    const { error } = await supabase.auth.updateUser({ password: newPassword });

    if (error) {
      setPasswordMsg({ text: "Erreur lors du changement.", type: "error" });
    } else {
      setPasswordMsg({ text: "Mot de passe mis à jour.", type: "success" });
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    }
    setPasswordLoading(false);
  }

  async function handleDeleteAccount() {
    if (deleteConfirm !== "SUPPRIMER") return;
    setDeleteLoading(true);
    setDeleteMsg(null);
    const supabase = createClient();

    await supabase.auth.signOut();
    router.push("/register");
  }

  return (
    <div className="max-w-2xl flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-zinc-900">Paramètres</h1>
        <p className="text-sm text-zinc-500 mt-1">
          Gérez votre compte et vos préférences.
        </p>
      </div>

      {/* Profil */}
      <SettingsSection
        title="Profil"
        description="Mettez à jour vos informations personnelles."
      >
        <form onSubmit={handleProfileSave} className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Field
              label="Prénom"
              value={firstName}
              onChange={setFirstName}
              placeholder="Jean"
            />
            <Field
              label="Nom"
              value={lastName}
              onChange={setLastName}
              placeholder="Dupont"
            />
          </div>
          <Field
            label="Email"
            type="email"
            value={email}
            onChange={setEmail}
            placeholder="toi@exemple.com"
          />
          {profileMsg && (
            <Feedback message={profileMsg.text} type={profileMsg.type} />
          )}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={profileLoading}
              className="bg-zinc-900 text-white text-sm font-medium px-5 py-2.5 rounded-lg hover:bg-zinc-700 transition-colors disabled:opacity-50"
            >
              {profileLoading ? "Sauvegarde..." : "Sauvegarder"}
            </button>
          </div>
        </form>
      </SettingsSection>

      {/* Sécurité */}
      <SettingsSection
        title="Sécurité"
        description="Changez votre mot de passe."
      >
        <form onSubmit={handlePasswordChange} className="flex flex-col gap-4">
          <Field
            label="Nouveau mot de passe"
            type="password"
            value={newPassword}
            onChange={setNewPassword}
            placeholder="••••••••"
          />
          <Field
            label="Confirmer le mot de passe"
            type="password"
            value={confirmPassword}
            onChange={setConfirmPassword}
            placeholder="••••••••"
          />
          {passwordMsg && (
            <Feedback message={passwordMsg.text} type={passwordMsg.type} />
          )}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={passwordLoading}
              className="bg-zinc-900 text-white text-sm font-medium px-5 py-2.5 rounded-lg hover:bg-zinc-700 transition-colors disabled:opacity-50"
            >
              {passwordLoading ? "Mise à jour..." : "Changer le mot de passe"}
            </button>
          </div>
        </form>
      </SettingsSection>

      {/* Danger zone */}
      <SettingsSection
        title="Zone de danger"
        description="Ces actions sont irréversibles. Agissez avec précaution."
        danger
      >
        <div className="flex flex-col gap-3">
          <p className="text-sm text-zinc-600">
            Tapez <span className="font-mono font-bold text-red-500">SUPPRIMER</span> pour confirmer la suppression de votre compte.
          </p>
          <input
            type="text"
            value={deleteConfirm}
            onChange={(e) => setDeleteConfirm(e.target.value)}
            placeholder="SUPPRIMER"
            className="bg-white border border-red-300 text-zinc-900 placeholder-zinc-400 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-400 w-full"
          />
          {deleteMsg && (
            <Feedback message={deleteMsg.text} type={deleteMsg.type} />
          )}
          <div className="flex justify-end">
            <button
              onClick={handleDeleteAccount}
              disabled={deleteConfirm !== "SUPPRIMER" || deleteLoading}
              className="bg-red-600 text-white text-sm font-medium px-5 py-2.5 rounded-lg hover:bg-red-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {deleteLoading ? "Suppression..." : "Supprimer mon compte"}
            </button>
          </div>
        </div>
      </SettingsSection>
    </div>
  );
}
