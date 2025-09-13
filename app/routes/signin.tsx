import { redirectDocument } from "react-router";

import { supabaseClientFromRequest } from "components/auth/client";
import { Auth } from "components/core/auth";

import type { Route as Route } from "./+types/signin";

export async function action({ request, params, context }: Route.ActionArgs) {
  const { supabaseClient, headers } = supabaseClientFromRequest(request);

  const { data, error } = await supabaseClient.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: "http://localhost:5173/auth-callback",
      queryParams: {
        access_type: "offline",
        prompt: "consent",
      },
    },
  });
  if (data.url) {
    return redirectDocument(data.url, { headers });
  }
}

export default function Component() {
  return <Auth />;
}
