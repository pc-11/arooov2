import { redirectDocument } from "react-router";

import { supabaseClientFromRequest } from "components/auth/client";
import { Auth } from "components/core/auth";

import type { Route as Route } from "./+types/signin";

type SupportedProvider = "google" | "github";

const SupportedProviders = ["google", "github"];

function isSupported(provider: string): provider is SupportedProvider {
  return provider.length > 0 && SupportedProviders.includes(provider);
}

export async function action({ request, params, context }: Route.ActionArgs) {
  const { supabaseClient, headers } = supabaseClientFromRequest(request);

  const formData = await request.formData();
  const oauthProvider = String(formData.get("oauth_provider"));

  if (!oauthProvider || !isSupported(oauthProvider)) {
    console.log("does not have oauthProvider");
    return null;
  }

  const { data, error } = await supabaseClient.auth.signInWithOAuth({
    provider: oauthProvider,
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
