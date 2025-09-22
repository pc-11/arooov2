import clsx from "clsx";

import { PronounGuideLink } from "components/core/links";
import { CountingTextArea } from "components/core/textarea-count";
import { Divider } from "components/ui-toolkit/divider";
import type { Database, Tables } from "database.types";
import { useState } from "react";
import { useFetcher } from "react-router";

export type Application = Tables<"applications">;

interface EditProps {
  name: string;
  inputType: "text" | "textarea";
}

interface FormProps {
  label: string;
  editProps?: EditProps | null;
  isRequired?: boolean;
  subLabel?: string | React.ReactElement | null;
  valueText?: string;
  layoutKind?: "column" | "row";
}

export function FormField({
  label,
  editProps,
  isRequired,
  subLabel,
  valueText,
  layoutKind,
}: FormProps) {
  const [text, setText] = useState("");
  let stylingClasses =
    "text-black bg-white font-normal border-1 border-gray-400 min-w-80 rounded-sm pl-1";
  let element: React.ReactElement;
  if (editProps?.inputType == "text") {
    element = (
      <input
        className={stylingClasses}
        name={editProps?.name}
        type="text"
        defaultValue={valueText ?? ""}
      />
    );
  } else if (editProps?.inputType == "textarea") {
    element = (
      <CountingTextArea
        className={clsx("w-full max-w-4xl min-h-10 resize", stylingClasses)}
        name={editProps?.name}
        rows={15}
        defaultValue={valueText ?? ""}
        maxLength={2000}
      />
    );
  } else {
    element = <>{valueText ?? ""}</>;
  }

  let subLabelElement: React.ReactElement | null;
  if (typeof subLabel == "string") {
    subLabelElement = <>{subLabel}</>;
  } else if (subLabel != null) {
    subLabelElement = subLabel;
  }

  layoutKind = layoutKind ?? (Boolean(editProps) ? "row" : "column");

  if (layoutKind == "row") {
    return (
      <>
        <div className="mt-3" />
        <b>{label}</b>
        <div className="text-sm">
          ({(isRequired ?? false) ? "required" : "optional"})
        </div>
        <div className="mt-5" />
        {subLabel}
        {element}
        <div className="mb-5" />
      </>
    );
  }

  return (
    <div className="flex shrink pt-1 pb-1">
      <div className="w-1/3">
        <div className="flex-col p-1">
          <b>{label}</b>

          <div className="text-sm">
            ({(isRequired ?? false) ? "required" : "optional"})
          </div>
          {subLabel ? (
            <div className="text-base/4">
              <br />
              <p className="font-bold text-sm/4.5">{subLabel}</p>
              <br />
            </div>
          ) : null}
        </div>
      </div>

      <div className="w-2/3 p-1 pl-5">{element}</div>
    </div>
  );
}

function innerForm({
  application,
  readOnly,
}: {
  application: Application;
  readOnly: boolean;
}) {
  return (
    <div className="flex-col">
      <Divider />
      <FormField
        label="Full name"
        editProps={readOnly ? null : { name: "full_name", inputType: "text" }}
        isRequired={true}
        valueText={application?.full_name ?? ""}
        layoutKind="column"
      />
      <Divider />
      <FormField
        label="Contact Email"
        editProps={
          readOnly ? null : { name: "email_contact", inputType: "text" }
        }
        subLabel="*We will use this email to contact you about your application."
        isRequired={true}
        valueText={application?.email_contact ?? ""}
        layoutKind="column"
      />
      <Divider />
      <FormField
        label="Google account email"
        editProps={
          readOnly ? null : { name: "email_google", inputType: "text" }
        }
        subLabel="*We use Google Calendar, Drive and Groups for internal coordination for members. We will use this email to add you to those resources if you get accepted as a member."
        valueText={application?.email_google ?? ""}
        layoutKind="column"
      />
      <Divider />
      <FormField
        label="Pronouns"
        editProps={readOnly ? null : { name: "pronouns", inputType: "text" }}
        subLabel={
          readOnly ? (
            "*This does not affect your application, we just want to know how to refer to you respectfully."
          ) : (
            <>
              What <PronounGuideLink>pronouns</PronounGuideLink> should people
              use for you at Double Union, such as at events? (This doesn't
              affect your application, we just want to know how to refer to you
              respectfully.)
            </>
          )
        }
        valueText={application?.pronouns ?? ""}
        layoutKind="column"
      />
      <Divider />
      <FormField
        label="Twitter Username"
        editProps={
          readOnly ? null : { name: "social_twitter", inputType: "text" }
        }
        valueText={application?.social_twitter ?? ""}
        layoutKind="column"
      />
      <Divider />
      <FormField
        label="Facebook URL"
        editProps={
          readOnly ? null : { name: "social_facebook", inputType: "text" }
        }
        valueText={application?.social_facebook ?? ""}
        layoutKind="column"
      />
      <Divider />
      <FormField
        label="Website URL"
        editProps={
          readOnly ? null : { name: "social_website", inputType: "text" }
        }
        valueText={application?.social_website ?? ""}
        layoutKind="column"
      />
      <Divider />
      <FormField
        label="LinkedIn URL"
        editProps={
          readOnly ? null : { name: "social_linkedin", inputType: "text" }
        }
        valueText={application?.social_linkedin ?? ""}
        layoutKind="column"
      />
      <Divider />
      <FormField
        label="Why are you interested in joining Double Union?"
        editProps={readOnly ? null : { name: "reasons", inputType: "textarea" }}
        subLabel={
          <>
            <p>
              We ask this because we'd like to learn about how your interests
              relate to DU. For example, what would you like to work on here, or
              what would you like to learn or share here? What about DU’s
              community appeals to you?
            </p>
            <br />
          </>
        }
        isRequired={true}
        valueText={application?.reasons ?? ""}
      ></FormField>
      <Divider />
      <FormField
        label={
          readOnly
            ? "What is your definition of your feminism?"
            : "Tell us about your feminism?"
        }
        subLabel={
          <>
            <p>
              DU works toward being a feminist space, and it’s important to us
              that new members care about this too.
            </p>
            <br />
            <p>
              To help us understand your view, we'd like to hear your thoughts
              or experiences around your own feminism. It's ok if you don't have
              a formal or academic way of talking about this! You can also
              answer with stories or memories. You can pick one of these
              questions or make up your own:
            </p>
            <br />
            <ul className="ml-10 list-disc">
              <li>How do you define your feminism?</li>
              <li>How does feminism inform your perspective on the world?</li>
              <li>What has feminism meant to you in your life?</li>
              <li>What have justice or equality meant for you in your life?</li>
              <li>
                How does your feminism include transgender people and nonbinary
                people?
              </li>
              <li>
                If you’re white, how do you incorporate race into your feminism?
              </li>
              <li>How do you incorporate class into your feminism?</li>
              <li>
                Have you had frustrations with people who call themselves
                feminists but continue to be oppressive or harmful, and how does
                that inform your perspective on feminism?
              </li>
            </ul>
            <br />
            <p>
              Part of being a feminist space is not expecting everyone to know
              everything all the time. None of us are perfect! We do expect
              everyone to treat people at DU with respect.
            </p>
            <br />
          </>
        }
        editProps={
          readOnly
            ? null
            : { name: "feminism_definition", inputType: "textarea" }
        }
        isRequired={true}
        valueText={application?.feminism_definition ?? ""}
      ></FormField>
      <Divider />
      <FormField
        label="Have you been to DU events or met DU members?"
        subLabel={
          readOnly ? null : (
            <>
              <p>
                This is not needed to send in an application, but it helps us
                remember if we’ve met you! Please include people’s names if you
                can (it’s completely ok if you can’t). Or let us know if you're
                planning to attend an upcoming event, so we can say hi to you.
              </p>
              <br />
            </>
          )
        }
        editProps={
          readOnly ? null : { name: "known_members", inputType: "textarea" }
        }
        isRequired={true}
        valueText={application?.known_members ?? ""}
      ></FormField>
    </div>
  );
}

export function Form({
  application,
  readOnly,
}: {
  application: Application;
  readOnly: boolean;
}) {
  let innerFormElement = innerForm({ application, readOnly });
  if (readOnly) {
    return <div>{innerFormElement}</div>;
  }
  const fetcher = useFetcher();
  return <fetcher.Form>{innerFormElement}</fetcher.Form>;
}
