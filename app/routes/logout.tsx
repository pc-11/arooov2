import type { Route as Route } from "./+types/logout";
import { redirectDocument } from "react-router";

import { supabaseClientFromRequest } from "components/auth/client";

export async function loader({ request }: Route.LoaderArgs) {
  const { supabaseClient, headers } = supabaseClientFromRequest(request);
  let error = supabaseClient.auth.signOut();
  if (error) {
    console.log(error);
  }
  return redirectDocument("/members/profile");
}
