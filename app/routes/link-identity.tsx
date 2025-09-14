import { redirectDocument } from "react-router";

import { supabaseClientFromRequest } from "components/auth/client";
import { LinkIdentityAuth } from "components/core/auth";

import type { Route as Route } from "./+types/link-identity";

type SupportedProvider = "google" | "github";

const SupportedProviders = ["google", "github"];

function isSupported(provider: string): provider is SupportedProvider {
  return provider.length > 0 && SupportedProviders.includes(provider);
}

export async function action({ request, params, context }: Route.ActionArgs) {
  const formData = await request.formData();
  const provider = String(formData.get("oauth_provider"));

  if (!provider || !isSupported(provider)) {
    console.log("does not have oauthProvider");
    return null;
  }

  const { supabaseClient, headers } = supabaseClientFromRequest(request);

  const { data, error } = await supabaseClient.auth.getUser();
  if (!data?.user) {
    console.log("not logged in!");
    return null;
  }

  const { data: oAuthData, error: oAuthError } =
    await supabaseClient.auth.linkIdentity({ provider });

  if (oAuthData?.url) {
    return redirectDocument(oAuthData.url, { headers });
  }
}

export default function Component() {
  return <LinkIdentityAuth />;
}
