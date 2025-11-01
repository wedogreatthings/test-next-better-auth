// app/register/page.jsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    console.log("🔍 Tentative d'inscription:", { email, name });
    console.log("🔍 Base URL:", process.env.NEXT_PUBLIC_APP_URL);

    try {
      const result = await authClient.signUp.email({
        email,
        password,
        name,
      });

      console.log("✅ Inscription réussie:", result);
      router.push("/dashboard");
    } catch (err) {
      console.error("❌ Erreur complète:", err);
      console.error("❌ Message:", err.message);
      console.error("❌ Status:", err.status);
      setError(err.message || "Erreur lors de l'inscription");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4 p-8">
        <h1 className="text-2xl font-bold">Inscription</h1>

        {error && (
          <div className="rounded bg-red-100 p-3 text-red-700">{error}</div>
        )}

        <input
          type="text"
          placeholder="Nom"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded border p-2"
          required
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded border p-2"
          required
        />

        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded border p-2"
          required
          minLength={6}
        />

        <button
          type="submit"
          disabled={isLoading}
          className="w-full rounded bg-blue-600 p-2 text-white hover:bg-blue-700 disabled:opacity-50"
        >
          {isLoading ? "Inscription en cours..." : "S'inscrire"}
        </button>

        <p className="text-center text-sm">
          Déjà un compte ?{" "}
          <a href="/login" className="text-blue-600 hover:underline">
            Se connecter
          </a>
        </p>
      </form>
    </div>
  );
}
