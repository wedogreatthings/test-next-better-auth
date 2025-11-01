// lib/auth.js
import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGODB_URI);
const db = client.db();

export const auth = betterAuth({
  database: mongodbAdapter(db),

  emailAndPassword: {
    enabled: true,
  },

  // 🔥 AJOUTE CECI - C'est essentiel pour Vercel
  trustedOrigins: [
    "https://test-next-better-auth.vercel.app",
    "http://localhost:3000",
    process.env.NEXT_PUBLIC_APP_URL,
  ].filter(Boolean), // Enlève les valeurs undefined

  user: {
    additionalFields: {
      firstName: {
        type: "string",
        required: false,
      },
      lastName: {
        type: "string",
        required: false,
      },
      phone: {
        type: "string",
        required: false,
      },
    },
  },
});
