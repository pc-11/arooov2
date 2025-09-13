import type { Route } from "./+types/auth-callback";

import { redirectDocument } from "react-router";

import { supabaseClientFromRequest } from "components/auth/client";

export async function loader({ request, params, context }: Route.LoaderArgs) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const next = requestUrl.searchParams.get("next") || "/";

  if (code) {
    const { supabaseClient, headers } = supabaseClientFromRequest(request);
    const { error } = await supabaseClient.auth.exchangeCodeForSession(code);
    if (error) {
      console.log(error);
    }
    return redirectDocument(next, { headers });
  }
  return redirectDocument(next);
}
