"use client";

import { authClient } from "@/lib/auth-client";

export default function Dashboard() {
  const { data: session, isPending } = authClient.useSession();

  if (isPending) {
    return <div>Chargement...</div>;
  }

  if (!session) {
    return <div>Non connecté</div>;
  }

  return (
    <div>
      <h1>Bienvenue, {session.user.name}</h1>
      <p>Email : {session.user.email}</p>

      <button
        onClick={async () => {
          await authClient.signOut();
          window.location.href = "/login";
        }}
        className="mt-4 rounded bg-red-600 px-4 py-2 text-white"
      >
        Se déconnecter
      </button>
    </div>
  );
}
