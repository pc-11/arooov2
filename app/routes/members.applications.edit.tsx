import type { Route } from "./+types/members.applications.edit";
import { supabaseClientFromRequest } from "components/auth/client";
import { type Role, RoleContext } from "components/auth/roles";
import {
  type Application,
  Form as ApplicationForm,
  FormField,
} from "components/core/application-form";
import { Email } from "components/core/email";
import { Heading } from "components/ui-toolkit/heading";
import type { Database, Tables } from "database.types";
import {
  data as wrap_data,
  redirect,
  useFetcher,
  useLoaderData,
} from "react-router";

type ApplicationUpdate = Database["public"]["Tables"]["applications"]["Update"];

export async function loader({ request, context }: Route.LoaderArgs) {
  let role: Role | null = context.get(RoleContext);
  if (!role?.isProspectiveMember()) {
    console.log("not a member! let home decide where they belong");
    return redirect("/");
  }

  const { supabaseClient, headers } = supabaseClientFromRequest(request);
  const { data } = await supabaseClient.from("applications").select();
  if (!data || data.length != 1) {
    throw new Response(null, { status: 404, statusText: "Not Found" });
  }

  return wrap_data(data[0], { headers });
}

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();

  const { supabaseClient, headers } = supabaseClientFromRequest(request);
  const {
    data: { user },
  } = await supabaseClient.auth.getUser();

  let applicationUpdate: ApplicationUpdate = {
    email_contact: formData.get("email_contact") as string,
    email_google: formData.get("email_google") as string,
    feminism_definition: formData.get("feminism_definition") as string,
    full_name: formData.get("full_name") as string,
    known_members: formData.get("known_members") as string,
    pronouns: formData.get("pronouns") as string,
    social_facebook: formData.get("social_facebook") as string,
    social_linkedin: formData.get("social_linkedin") as string,
    social_twitter: formData.get("social_twitter") as string,
    social_website: formData.get("social_website") as string,
    reasons: formData.get("reasons") as string,
  };

  const { data, error } = await supabaseClient
    .from("applications")
    .upsert(applicationUpdate)
    .select();

  if (error) {
    console.error("applicationError: ", error);
  }

  return wrap_data(data, { headers });
}

export default function Component({}: Route.ComponentProps) {
  let application = useLoaderData<Application>();
  return (
    <>
      <div>
        <Heading level={2}>Membership Application</Heading>
        <div className="mt-5" />
        <p>
          Hello! We're glad you're interested in becoming a member of Double
          Union. We love reading applications and look forward to meeting you if
          we haven't already. If you have any questions about the application or
          application process, please email our membership coordinators at{" "}
          <Email emailStr="join@doubleunion.org" />
        </p>
        <br />
        <p>
          You can save this application at any time before you submit it. Once
          you submit your application, it will be visible to all current Double
          Union members while it is open, then{" "}
          <i>hidden once it is accepted or rejected</i>. No part of your
          application will ever be public.
        </p>
        <br />
        <p>
          If this application looks blanker than you left it, double check that
          you logged in with the same service as before by logging out and
          trying the other one (GitHub or Google).
        </p>
      </div>
      <div className="mt-10" />
      {/* <ApplicationFormElement application={application} /> */}
      <ApplicationForm application={application} readOnly={false} />
    </>
  );
}
