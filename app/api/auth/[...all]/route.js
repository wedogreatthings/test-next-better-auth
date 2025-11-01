import { auth } from "@/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";

// 🔥 IMPORTANT : Utiliser toNextJsHandler et passer auth.handler
export const { GET, POST } = toNextJsHandler(auth.handler);
