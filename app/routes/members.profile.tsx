import { data as wrap_data, useLoaderData, useFetcher } from "react-router";
import type { Route } from "./+types/members.profile";

import { Heading } from "components/ui-toolkit/heading";
import { Button } from "components/ui-toolkit/button";
import { Fieldset, Legend } from "components/ui-toolkit/fieldset";

import type { Database, Tables } from "database.types";
import { supabaseClientFromRequest } from "components/auth/client";
import { Email } from "components/core/email";

import {
  MembersPublicListLink,
  GravatarSupportLink,
} from "components/core/links";

import clsx from "clsx";

type Profile = Tables<"profile">;
type ProfileUpdate = Database["public"]["Tables"]["profile"]["Update"];

interface OptionalFieldProps {
  checkboxId: string;
  checkboxName: string;
  checkboxLabel?: string | React.ReactElement;
  checkboxValue?: "0" | "1";
}

interface FormFieldProps {
  id: string;
  label: string;
  name: string;
  type: "text" | "textarea";
  value?: string;
  maxWidth?: number;
  accessory?: React.ReactElement;
  optional?: OptionalFieldProps;
}

const FormCheckbox: React.FC<OptionalFieldProps> = ({
  checkboxId,
  checkboxName,
  checkboxLabel,
  checkboxValue,
}) => {
  var value = checkboxValue ?? "0";
  var label =
    checkboxLabel ?? "Check this if you want it to show up on your profile.";

  if (typeof label == "string") {
    var labelElement: React.ReactElement = (
      <label className="text-black font-normal" htmlFor={checkboxId}>
        {label}
      </label>
    );
  } else {
    var labelElement: React.ReactElement = label;
  }

  return (
    <div className="flex">
      <input
        id={checkboxId}
        type="checkbox"
        name={checkboxName}
        value={value}
        defaultChecked={checkboxValue == "1"}
      />
      &nbsp;
      {labelElement}
    </div>
  );
};

const FormField: React.FC<FormFieldProps> = ({
  label,
  value,
  type,
  maxWidth,
  optional,
  accessory,
  ...fieldProps
}) => {
  const textStylingClasses =
    "text-black bg-white font-normal border-1 border-gray-400 min-w-80";
  var textField = (
    <textarea
      className={clsx("w-full max-w-4xl min-h-10 resize", textStylingClasses)}
      defaultValue={value}
      {...fieldProps}
    />
  );
  if (type == "text") {
    textField = (
      <input
        className={textStylingClasses}
        defaultValue={value}
        {...fieldProps}
      />
    );
  }
  var optionalCheckbox = optional ? <FormCheckbox {...optional} /> : <></>;

  return (
    <Fieldset className="mb-2">
      <Legend>
        <label htmlFor={fieldProps.id} className="text-black">
          {label}
        </label>
      </Legend>
      {textField}
      {accessory ?? <></>}
      {optionalCheckbox}
    </Fieldset>
  );
};

const SectionProfileForm: React.FC<{ profile: Profile }> = ({ profile }) => {
  // UI Opinion: There should probably be a header or other separation
  // of the authentication + form fields, but for parity this is
  // not present in the original page.
  const shouldIncludeProfileHeader: boolean = false;

  var label = (
    <div>
      Show name, website, and{" "}
      <GravatarSupportLink>Gravatar</GravatarSupportLink> (if you've set up a
      Gravatar) on{" "}
      <MembersPublicListLink>DU public website</MembersPublicListLink>
    </div>
  );

  const fetcher = useFetcher();

  return (
    <fetcher.Form method="post">
      {shouldIncludeProfileHeader && <Heading level={2}>Profile</Heading>}
      <p>
        {" "}
        Profile fields are only visible to members by default and are totally
        optional.
      </p>
      <Button color="dark/primary" className="mt-2 mb-2" type="submit">
        Save profile
      </Button>
      <FormCheckbox
        checkboxId="public_member"
        checkboxLabel={label}
        checkboxName="public_member"
        checkboxValue={profile.public_member ? "1" : "0"}
      />
      <FormField
        id="display_name"
        label="Name"
        type="text"
        name="display_name"
        value={profile.display_name ?? ""}
      />
      <FormField
        id="pronounceable_name"
        label="How to pronounce your name (used by automated voice for door entry system)"
        type="text"
        name="pronounceable_name"
        value={profile.pronounceable_name ?? ""}
      />
      <FormField
        id="pronouns"
        label="Pronouns"
        type="text"
        name="pronouns"
        value={profile?.pronouns ?? ""}
      />
      <FormField
        id="email_display"
        label="Email displayed on member profile"
        type="text"
        name="email_display"
        value={profile.email_display ?? ""}
      />
      {/* TODO: factor this out to a separate fragment*/}
      <strong>Google-friendly email</strong>
      <p>{profile.email_google}</p>
      <br />
      <div>
        If you need to also change the "Google-friendly" email address that DU
        uses for your Google Drive, Google Calendar, and Google Groups access
        (for example, if you've lost access to that Google account or are
        switching to using a new Google account), please email the Membership
        Coordinators <Email emailStr="membership@doubleunion.org" />. They will
        need to manually update your account in those systems.
      </div>
      <br />
      <FormField
        id="social_twitter"
        label="Twitter username"
        type="text"
        name="social_twitter"
        value={profile.social_twitter ?? ""}
      />
      <FormField
        id="social_facebook"
        label="Facebook"
        type="text"
        name="social_facebook"
        value={profile.social_facebook ?? ""}
      />
      <FormField
        id="social_website"
        label="Website"
        type="text"
        name="social_website"
        value={profile.social_website ?? ""}
      />
      <FormField
        id="social_linkedin"
        label="LinkedIn"
        type="text"
        name="social_linkedin"
        value={profile.social_linkedin ?? ""}
      />
      <FormField
        id="social_blog"
        label="Blog"
        type="text"
        name="social_blog"
        value={profile.social_blog ?? ""}
      />
      <FormField
        id="summary"
        label="Tell us a little about yourself!"
        type="textarea"
        name="summary"
        value={profile.summary ?? ""}
      />
      <FormField
        id="reasons"
        label="Why are you interested in joining Double Union?"
        type="textarea"
        name="reasons"
        value={profile.reasons ?? ""}
        optional={{
          checkboxId: "public_reasons",
          checkboxName: "public_reasons",
          checkboxValue: profile.public_reasons ? "1" : "0",
        }}
      />
      <FormField
        id="projects"
        label="What would you like to work on in the space?"
        type="textarea"
        name="projects"
        value={profile.projects ?? ""}
        optional={{
          checkboxId: "public_projects",
          checkboxName: "public_projects",
          checkboxValue: profile.public_projects ? "1" : "0",
        }}
      />
      <FormField
        id="skills"
        label="What skills are you most interested in learning, improving, and/or teaching?"
        type="textarea"
        name="skills"
        value={profile.skills ?? ""}
        optional={{
          checkboxId: "public_skills",
          checkboxName: "public_skills",
          checkboxValue: profile.public_skills ? "1" : "0",
        }}
      />

      <FormField
        id="email_gravatar"
        label="Gravatar email*"
        type="text"
        name="email_gravatar"
        value={profile.email_gravatar ?? ""}
        accessory={
          <span className="ml-2">
            * override email for <a href="http://gravatar.com">Gravatar</a>
          </span>
        }
      />
      <Button color="dark/primary" className="mt-2 mb-2" type="submit">
        Save profile
      </Button>
    </fetcher.Form>
  );
};

const SectionAuthentication: React.FC = () => {
  // TODO: pass as an argument the current available auths to select an auth
  return (
    <div>
      <p>
        The Double Union app supports authenticating with GitHub and Google.
      </p>
      <br />
      <p>
        You can currently log in via <b>google_oauth2.</b>
      </p>
    </div>
  );
};

// MARK: - React Router Reserved

export async function loader({ request, context }: Route.LoaderArgs) {
  const { supabaseClient, headers } = supabaseClientFromRequest(request);
  const { data } = await supabaseClient.from("profile").select();
  if (!data || data.length != 1) {
    return null;
  }

  return wrap_data(data[0], { headers });
}

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();

  const { supabaseClient, headers } = supabaseClientFromRequest(request);
  const {
    data: { user },
  } = await supabaseClient.auth.getUser();

  let profileUpdate: ProfileUpdate = {
    display_name: formData.get("display_name") as string,
    pronounceable_name: formData.get("pronounceable_name") as string,
    pronouns: formData.get("pronouns") as string,
    email_display: formData.get("email_display") as string,
    social_twitter: formData.get("social_twitter") as string,
    social_facebook: formData.get("social_facebook") as string,
    social_website: formData.get("social_website") as string,
    social_linkedin: formData.get("social_linkedin") as string,
    social_blog: formData.get("social_blog") as string,
    summary: formData.get("summary") as string,
    reasons: formData.get("reasons") as string,
    projects: formData.get("projects") as string,
    skills: formData.get("skills") as string,
    email_gravatar: formData.get("email_gravatar") as string,
    user_id: user?.id,
    public_projects: formData.get("public_projects") == "1",
    public_reasons: formData.get("public_reasons") == "1",
    public_skills: formData.get("public_skills") == "1",
    public_member: formData.get("public_member") == "1",
  };
  console.log(profileUpdate);

  const { data, error } = await supabaseClient
    .from("profile")
    .upsert(profileUpdate)
    .select();

  if (error) {
    console.log("profileError: ", error);
  }

  return wrap_data(data, { headers });
}

export default function MembersProfile({}: Route.ComponentProps) {
  let profile: Profile | null = useLoaderData<typeof loader>();
  if (!profile) {
    return <div></div>;
  }
  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <Heading level={1}>Edit Profile</Heading>
      <Heading level={2}>Authentication</Heading>
      <SectionAuthentication />
      <SectionProfileForm profile={profile} />
    </div>
  );
}
