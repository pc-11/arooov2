import {
  data as wrap_data,
  useLoaderData,
  useFetcher,
  Form,
} from "react-router";

import type { Route } from "./+types/members.applications.detail";
import { supabaseClientFromRequest } from "components/auth/client";
import {
  ApplicationCommentingLink,
  ApplicationCriteriaLink,
  ApplicationLink,
  ConfidentialityPolicyLink,
} from "components/core/links";
import { Button } from "components/ui-toolkit/button";
import { Divider } from "components/ui-toolkit/divider";
import { Fieldset, Legend } from "components/ui-toolkit/fieldset";
import { Heading } from "components/ui-toolkit/heading";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "components/ui-toolkit/table";
import type { Database, Tables } from "database.types";

type Profile = Tables<"profile">;
type ProfileUpdate = Database["public"]["Tables"]["profile"]["Update"];

interface LinkableUser {
  name: string;
  id: string;
}

interface Comment {
  user: LinkableUser;
  created_at: string;
  last_modified: string;
}

export async function loader({ request, context }: Route.LoaderArgs) {
  // Given user_id: UserId:  fetch applications.user_id = user_id
  // Given user_id: fetch votes where votes.application_id = user_id
  // Given user_id: fetch comments where comments.application_id = user_id
  return null;
}

export async function action({ request }: Route.ActionArgs) {
  //   const formData = await request.formData();
  //   const { supabaseCli  ent, headers } = supabaseClientFromRequest(request);
  //   const {
  //     data: { user },
  //   } = await supabaseClient.auth.getUser();
  //   let profileUpdate: ProfileUpdate = {};
  //   const { data, error } = await supabaseClient
  //     .from("profile")
  //     .upsert(profileUpdate)
  //     .select();
  //   if (error) {
  //     console.error("profileError: ", error);
  //   }
  //   return wrap_data(data, { headers });
}

interface ReadOnlyFormProps {
  label: string;
  isRequired?: boolean;
  subLabel?: string;
  valueText?: string;
}

export function FormField({
  label,
  isRequired,
  subLabel,
  valueText,
}: ReadOnlyFormProps) {
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

      <div className="w-2/3 p-1 pl-5">{valueText ?? ""}</div>
    </div>
  );
}

export function ReadonlyForm() {
  return (
    <div className="flex-col">
      <Divider />
      <FormField
        label="Full name"
        isRequired={true}
        valueText="Peterson Cheng"
      />
      <Divider />
      <FormField
        label="Contact Email"
        subLabel="*We will use this email to contact you about your application."
        isRequired={true}
        valueText="tchspetersoncheng@gmail.com"
      />
      <Divider />
      <FormField
        label="Google account email"
        subLabel="*We use Google Calendar, Drive and Groups for internal coordination for members. We will use this email to add you to those resources if you get accepted as a member."
        valueText="tchspetersoncheng@gmail.com"
      />
      <Divider />
      <FormField
        label="Pronouns"
        subLabel="*This does not affect your application, we just want to know how to refer to you respectfully."
        valueText="she/they"
      />
      <Divider />
      <FormField label="Twitter Username" />
      <Divider />
      <FormField label="Facebook URL" />
      <Divider />
      <FormField label="Website URL" />
      <Divider />
      <FormField label="LinkedIn URL" />
      <Divider />
      <FormField
        label="Why are you interested in joining Double Union?"
        isRequired={true}
      ></FormField>
      <Divider />
      <FormField
        label="What is your definition of your feminism?"
        isRequired={true}
      ></FormField>
      <Divider />
      <FormField
        label="Have you been to DU events or met DU members?"
        isRequired={true}
      ></FormField>
    </div>
  );
}

export function SponsorshipForm() {
  return (
    <Fieldset className="mb-2 flex items-baseline space-x-3">
      <input id="sponsorship" type="checkbox"></input>
      <Legend>
        <label htmlFor="sponsorship" className="text-black">
          I've met this person and think they would be a respectful member of
          the DU community.
        </label>
      </Legend>
      <Button color="dark/primary" className="mt-2 mb-2" type="submit">
        Submit
      </Button>
    </Fieldset>
  );
}

export function StatusTable({
  votesFor,
  votesAgainst,
  votesMissing,
}: {
  votesFor: LinkableUser[];
  votesAgainst: LinkableUser[];
  votesMissing: LinkableUser[];
}) {
  return (
    <table className="table-auto">
      <TableHead>
        <TableRow className="p-0">
          <TableHeader className="w-2/3"></TableHeader>
          <TableHeader className="w-1/3"></TableHeader>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow key="submitted" className="align-top p-0">
          <TableCell>Submitted</TableCell>
          <TableCell>Jul 11 at 1:26am (2 months ago)</TableCell>
        </TableRow>
        <TableRow key="sponsorships" className="align-top">
          <TableCell>
            Sponsors (who have met this person and recommend them)
          </TableCell>
          <TableCell className="w-1/3">none, yet</TableCell>
        </TableRow>

        <TableRow key="votesFor" className="align-top">
          <TableCell className="p-0 m-0 text-align-start">
            <div className="max-h-full">
              Votes <b>for</b> membership ({votesFor.length})
            </div>
          </TableCell>
          <TableCell>
            {votesFor.length > 0
              ? votesFor.map((linkableUser: LinkableUser) => (
                  <div key={`id-${linkableUser.id}`}>
                    <a href={`/members/users/${linkableUser.id}`}>
                      {linkableUser.name}
                    </a>
                    <br />
                  </div>
                ))
              : "--"}
          </TableCell>
        </TableRow>

        <TableRow key="votesAgainst" className="align-top">
          <TableCell className="p-0 m-0 text-align-start">
            <div className="max-h-full">
              Votes <b>against</b> membership ({votesAgainst.length})
            </div>
          </TableCell>
          <TableCell>
            {votesAgainst.length > 0
              ? votesAgainst.map((linkableUser: LinkableUser) => (
                  <div key={`id-${linkableUser.id}`}>
                    <a href={`/members/users/${linkableUser.id}`}>
                      {linkableUser.name}
                    </a>
                    <br />
                  </div>
                ))
              : "--"}
          </TableCell>
        </TableRow>

        <TableRow key="votesMissing" className="align-top">
          <TableCell className="p-0 m-0 text-align-start">
            <div className="max-h-full">
              Not yet voted ({votesMissing.length})
            </div>
          </TableCell>
          <TableCell>
            {votesMissing.length > 0
              ? votesMissing.map((linkableUser: LinkableUser) => (
                  <div key={`id-${linkableUser.id}`}>
                    <a href={`/members/users/${linkableUser.id}`}>
                      {linkableUser.name}
                    </a>
                    <br />
                  </div>
                ))
              : "--"}
          </TableCell>
        </TableRow>
      </TableBody>
    </table>
  );
}

export default function MembersApplicationsDetail({}: Route.ComponentProps) {
  let fakeSponsorships: LinkableUser[] = [
    { name: "Sponsor1", id: "1" },
    { name: "Sponsor2", id: "2" },
    { name: "Sponsor3", id: "3" },
    { name: "Sponsor4", id: "4" },
    { name: "Sponsor5", id: "5" },
    { name: "Sponsor5", id: "6" },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <ApplicationLink>Back to Applications Overview</ApplicationLink>
      <br />
      <Heading level={2}>Application</Heading>
      <p className="pb-5">
        As guided by our{" "}
        <ConfidentialityPolicyLink>
          Confidentiality Policy
        </ConfidentialityPolicyLink>
        , please keep all information about people's individual applications
        (such as contents, comments from members, and votes) confidential among
        DU members.
      </p>
      <ReadonlyForm />
      <Heading level={2}>Sponsorship</Heading>
      <SponsorshipForm />
      <Heading level={2}>Status</Heading>
      <StatusTable
        votesFor={fakeSponsorships}
        votesAgainst={[]}
        votesMissing={[]}
      />
      <Heading level={2}>Comments</Heading>
      <div className="text-base/6">
        <p>
          {" "}
          You can help voting members decide on applications by writing
          comments! Here's our{" "}
          <ApplicationCriteriaLink>
            criteria for prospective members{" "}
          </ApplicationCriteriaLink>{" "}
          to consider when commenting , sponsoring, and voting.
          <br />
          <br />
        </p>
        <p>
          Your comment will be visible to yourself and current voting members.
          Voting members can see all member comments.
          <br />
          <br />
        </p>
        <p>
          If you have a concern about an applicant that you want to report
          privately,{" "}
          <ApplicationCommentingLink>
            here's how to send your comment
          </ApplicationCommentingLink>
          . Thanks!
          <br />
          <br />
        </p>
      </div>
    </div>
  );
}
