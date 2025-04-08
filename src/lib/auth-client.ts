import { createAuthClient } from "better-auth/react";
import { adminClient } from "better-auth/client/plugins";
export const { signIn, signUp, useSession, signOut, admin } = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL,
  plugins: [adminClient()],
});
