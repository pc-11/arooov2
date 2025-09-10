import { useLoaderData } from "react-router";

import { Heading } from "../../components/ui-toolkit/heading";
import { Text } from "../../components/ui-toolkit/text";
import { Button } from "../../components/ui-toolkit/button";
import { Input } from "../../components/ui-toolkit/input";
import { Textarea } from "../../components/ui-toolkit/textarea";
import { Fieldset, Legend } from "../../components/ui-toolkit/fieldset";

import { supabase } from "../../components/core/auth";
import { Email } from "../../components/core/email";
import type { Database, Tables } from "../../database.types";

import {
  MembersPublicListLink,
  GravatarSupportLink,
} from "components/core/links";

import clsx from "clsx";

type Profile = Tables<"profile">;

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
      {label}
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

  return (
    <div>
      {shouldIncludeProfileHeader && <Heading level={2}>Profile</Heading>}
      <p>
        {" "}
        Profile fields are only visible to members by default and are totally
        optional.
      </p>
      <Button color="dark/primary" className="mt-2 mb-2">
        Save profile
      </Button>
      <FormCheckbox
        checkboxId="user_profile_show_name_on_site"
        checkboxLabel={label}
        checkboxName="user_profile[show_name_on_site]"
        checkboxValue={profile.public_member ? "1" : "0"}
      />
      <FormField
        id="user_name"
        label="Name"
        type="text"
        name="user[name]"
        value={profile.display_name ?? ""}
      />
      <FormField
        id="user_pronounceable_name"
        label="How to pronounce your name (used by automated voice for door entry system)"
        type="text"
        name="user[pronounceable_name]"
        value={profile.pronounceable_name ?? ""}
      />
      <FormField
        id="user_profile_attributes_pronouns"
        label="Pronouns"
        type="text"
        name="user[pronouns]"
        value={profile?.pronouns ?? ""}
      />
      <FormField
        id="user_email"
        label="Email displayed on member profile"
        type="text"
        name="user[email]"
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
        id="user_profile_attributes_twitter"
        label="Twitter username"
        type="text"
        name="user[profile_attributes][twitter]"
        value={profile.social_twitter ?? ""}
      />
      <FormField
        id="user_profile_attributes_facebook"
        label="Facebook"
        type="text"
        name="user[profile_attributes][facebook]"
        value={profile.social_facebook ?? ""}
      />
      <FormField
        id="user_profile_attributes_website"
        label="Website"
        type="text"
        name="user[profile_attributes][website]"
        value={profile.social_website ?? ""}
      />
      <FormField
        id="user_profile_attributes_linkedin"
        label="LinkedIn"
        type="text"
        name="user[profile_attributes][linkedin]"
        value={profile.social_linkedin ?? ""}
      />
      <FormField
        id="user_profile_attributes_blog"
        label="Blog"
        type="text"
        name="user[profile_attributes][blog]"
        value={profile.social_blog ?? ""}
      />
      <FormField
        id="user_profile_attributes_summary"
        label="Tell us a little about yourself!"
        type="textarea"
        name="user[profile_attributes][summary]"
        value={profile.summary ?? ""}
      />
      <FormField
        id="user_profile_attributes_reasons"
        label="Why are you interested in joining Double Union?"
        type="textarea"
        name="user[profile_attributes][reasons]"
        value={profile.reasons ?? ""}
        optional={{
          checkboxId: "user_profile_attributes_show_reasons",
          checkboxName: "user[profile_attributes][show_reasons]",
          checkboxValue: profile.public_reasons ? "1" : "0",
        }}
      />
      <FormField
        id="user_profile_attributes_projects"
        label="What would you like to work on in the space?"
        type="textarea"
        name="user[profile_attributes][projects]"
        value={profile.projects ?? ""}
        optional={{
          checkboxId: "user_profile_attributes_show_projects",
          checkboxName: "user[profile_attributes][show_projects]",
          checkboxValue: profile.public_projects ? "1" : "0",
        }}
      />
      <FormField
        id="user_profile_attributes_skills"
        label="What skills are you most interested in learning, improving, and/or teaching?"
        type="textarea"
        name="user[profile_attributes][skills]"
        value={profile.skills ?? ""}
        optional={{
          checkboxId: "user_profile_attributes_show_skills",
          checkboxName: "user[profile_attributes][show_skills]",
          checkboxValue: profile.public_skills ? "1" : "0",
        }}
      />

      <FormField
        id="user_profile_attributes_gravatar_email"
        label="Gravatar email*"
        type="text"
        name="user[profile_attributes][gravatar_email]"
        value={profile.email_gravatar ?? ""}
        accessory={
          <span className="ml-2">
            * override email for <a href="http://gravatar.com">Gravatar</a>
          </span>
        }
      />
      <Button color="dark/primary" className="mt-2 mb-2">
        Save profile
      </Button>
    </div>
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

export async function loader(): Promise<Profile | null> {
  const { data } = await supabase.from("profile").select();
  if (!data || data.length != 1) {
    return null;
  }

  return data[0];
}

export default function MembersProfile() {
  let profile: Profile | null = useLoaderData<typeof loader>();
  if (!profile) {
    return <ErrorBoundary />;
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
