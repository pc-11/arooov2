import { Heading } from "../../components/ui-toolkit/heading";
import { Text } from "../../components/ui-toolkit/text";
import { Button } from "../../components/ui-toolkit/button";
import { Input } from "../../components/ui-toolkit/input";
import { Textarea } from "../../components/ui-toolkit/textarea";
import { Fieldset, Legend } from "../../components/ui-toolkit/fieldset";

// TODO: The existing form fields seem to derive from some kind of
// unpacking of a nested structure of some kind - unclear if Supabase
// form submission works similarly - using an enum here to
// decouple the form fields from the previous implementation.
// enum FormField {
//   UserName = "user[name]",
//   UserPronounceableName = "user[pronounceable_name]",
//   ProfileAttributes = "user[profile_attributes]",
//   UserEmail = "user[email]",
//   Pronouns = "user[profile_attributes][pronouns]",
//   Twitter = "user[profile_attributes][twitter]",
//   Facebook = "user[profile_attributes][facebook]",
//   Website = "user[profile_attributes][website]",
//   LinkedIn = "user[profile_attributes][linkedin]",
//   Blog = "user[profile_attributes][blog]",
//   Summary = "user[profile_attributes][summary]",
//   ShowReasons = "user[profile_attributes][show_reasons]",
//   Projects = "user[profile_attributes][projects]",
//   Skills = "user[profile_attributes][skills]",
//   GravatarEmail = "user[profile_attributes][gravatar_email]",
// }

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
      ></input>
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
    "text-black bg-white font-normal border-1 border-gray-400";
  var textField = (
    <textarea className={textStylingClasses} {...fieldProps}>
      {value}
    </textarea>
  );
  if (type == "text") {
    textField = <input className={textStylingClasses} {...fieldProps}></input>;
  }
  var optionalCheckbox = optional ? (
    <FormCheckbox {...optional}></FormCheckbox>
  ) : (
    <div></div>
  );

  return (
    <Fieldset className="mb-2">
      <Legend>
        <label htmlFor={fieldProps.id} className="text-black">
          {label}
        </label>
      </Legend>
      {textField}
      {accessory ?? <div></div>}
      {optionalCheckbox}
    </Fieldset>
  );
};

const SectionProfileForm: React.FC = () => {
  // UI Opinion: There should probably be a header or other separation
  // of the authentication + form fields, but for parity this is
  // not present in the original page.
  const shouldIncludeProfileHeader: boolean = false;

  var label = (
    <div>
      Show name, website, and{" "}
      <a href="https://en.gravatar.com/support/what-is-gravatar/">Gravatar</a>{" "}
      (if you've set up a Gravatar) on{" "}
      <a href="/membership#current-members">DU public website</a>?
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
      ></FormCheckbox>
      <FormField
        id="user_name"
        label="Name"
        type="text"
        name="user[name]"
        value="Name"
      ></FormField>
      <FormField
        id="user_pronounceable_name"
        label="How to pronounce your name (used by automated voice for door entry system)"
        type="text"
        name="user[pronounceable_name]"
        value="Pronounceable Name"
      ></FormField>
      <FormField
        id="user_profile_attributes_pronouns"
        label="Pronouns"
        type="text"
        name="user[pronounceable_name]"
        value="Pronouns"
      ></FormField>
      <FormField
        id="user_email"
        label="Email displayed on member profile"
        type="text"
        name="user[email]"
        value="Email"
      ></FormField>
      {/* TODO: factor this out to a separate fragment*/}
      <strong>Google-friendly email</strong>
      <p>my_email_in_text@gmail.com</p>
      <br />
      <div>
        If you need to also change the "Google-friendly" email address that DU
        uses for your Google Drive, Google Calendar, and Google Groups access
        (for example, if you've lost access to that Google account or are
        switching to using a new Google account), please email the Membership
        Coordinators (membership@doubleunion.org). They will need to manually
        update your account in those systems.
      </div>
      <br />
      <FormField
        id="user_profile_attributes_twitter"
        label="Twitter username"
        type="text"
        name="user[profile_attributes][twitter]"
        value="Twitter"
      ></FormField>
      <FormField
        id="user_profile_attributes_facebook"
        label="Facebook"
        type="text"
        name="user[profile_attributes][facebook]"
        value="Facebook"
      ></FormField>
      <FormField
        id="user_profile_attributes_website"
        label="Website"
        type="text"
        name="user[profile_attributes][website]"
        value="Website"
      ></FormField>
      <FormField
        id="user_profile_attributes_linkedin"
        label="LinkedIn"
        type="text"
        name="user[profile_attributes][linkedin]"
        value="LinkedIn"
      ></FormField>
      <FormField
        id="user_profile_attributes_blog"
        label="Blog"
        type="text"
        name="user[profile_attributes][blog]"
        value="Blog"
      ></FormField>
      <FormField
        id="user_profile_attributes_summary"
        label="Tell us a little about yourself!"
        type="text"
        name="user[profile_attributes][summary]"
        value="Summary"
      ></FormField>
      <FormField
        id="user_profile_attributes_reasons"
        label="Why are you interested in joining Double Union?"
        type="textarea"
        name="user[profile_attributes][reasons]"
        value="Reasons"
        optional={{
          checkboxId: "user_profile_attributes_show_reasons",
          checkboxName: "user[profile_attributes][show_reasons]",
        }}
      ></FormField>
      <FormField
        id="user_profile_attributes_projects"
        label="What would you like to work on in the space?"
        type="textarea"
        name="user[profile_attributes][projects]"
        value="Projects"
        optional={{
          checkboxId: "user_profile_attributes_show_projects",
          checkboxName: "user[profile_attributes][show_projects]",
        }}
      ></FormField>
      <FormField
        id="user_profile_attributes_skills"
        label="What skills are you most interested in learning, improving, and/or teaching?"
        type="textarea"
        name="user[profile_attributes][skills]"
        value="Skills"
        optional={{
          checkboxId: "user_profile_attributes_show_skills",
          checkboxName: "user[profile_attributes][show_skills]",
        }}
      ></FormField>

      <FormField
        id="user_profile_attributes_show_gravatar_email"
        label="Gravatar email*"
        type="text"
        name="user[profile_attributes][show_gravatar_email]"
        value="Gravatar email"
        accessory={
          <span className="ml-2">
            * override email for <a href="http://gravatar.com">Gravatar</a>
          </span>
        }
      ></FormField>
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

export default function MembersProfile() {
  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <Heading level={1}>Edit Profile</Heading>
      <Heading level={2}>Authentication</Heading>
      <SectionAuthentication></SectionAuthentication>
      <SectionProfileForm></SectionProfileForm>
    </div>
  );
}
