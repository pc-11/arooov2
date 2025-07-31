import { Badge } from "../../components/ui-toolkit/badge";
import { Button } from "../../components/ui-toolkit/button";
import { Divider } from "../../components/ui-toolkit/divider";
import { Heading } from "../../components/ui-toolkit/heading";
import { Link } from "../../components/ui-toolkit/link";
import { Text } from "../../components/ui-toolkit/text";
import { Textarea } from "../../components/ui-toolkit/textarea";
import clsx from "clsx";

/*

Overall file TODOs:
- Make body have responsive width (currently 100%)
- Stripe Integration
- Forms Integration
- Responsive Header Sizes + Padding
- Resolving relative URLs to include user_id

 */

// TODO: Refactor this to a form component
function componentStripeDropdown(): React.ReactElement {
  const hardcodedCurrentDues: string = "medium_monthly";
  const hardcodedStripeData = [
    { id: "15_monthly", amount: 15.0 },
    { id: "20_monthly", amount: 20.0 },
    { id: "medium_monthly", amount: 25.0 },
    { id: "30_monthly", amount: 30.0 },
    { id: "35_monthly", amount: 35.0 },
    { id: "40_monthly", amount: 40.0 },
    { id: "45_monthly", amount: 45.0 },
    { id: "large_monthly", amount: 50.0 },
    { id: "75_monthly", amount: 75.0 },
    { id: "extra_large_monthly", amount: 100.0 },
  ];
  const dollarAsText = (amount: number) => {
    return `${Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount)} USD Monthly`;
  };
  return (
    <div className="pt-3 pb-3">
      {/* TODO: Post to /members/users/{user_id}/dues or whichever new route */}
      <form id="dues-form" className="flex flexcol">
        {/* TODO: Migrate select+option to whatever the selectMenu equivalent is in TailwindPlus? Not currently copied over */}
        <select className="bg-white rounded-sm p-2">
          {hardcodedStripeData.map((item) => (
            <option key={item.id} value={item.amount}>
              {dollarAsText(item.amount)}
            </option>
          ))}
          {/* <ListboxOption key=""></ListboxOption> */}
        </select>
        <div className="min-w-5"> </div>
        <Button color="dark/primary">Update Dues</Button>
      </form>
    </div>
  );
}

function componentEmail(email_str: string): React.ReactElement {
  return <Link href={`mailto:${email_str}`}>{email_str}</Link>;
}

enum HeaderId {
  ManageMembership = "manage-membership",
  UpdateDues = "update-membership-dues",
  CurrentDues = "current-due-status",
  Suggestions = "suggestions",
  ApplyScholarShip = "apply-for-a-scholarship",
  CancelMembership = "cancel-your-membership",
}

// Pre-declare header constants to construct the Table of Contents
const headers: Record<HeaderId, string> = {
  [HeaderId.ManageMembership]: "Manage Membership",
  [HeaderId.UpdateDues]: "Update Membership Dues",
  [HeaderId.CurrentDues]: "Your Current Dues Status",
  [HeaderId.Suggestions]: "Suggestions",
  [HeaderId.ApplyScholarShip]: "Apply for a Scholarship",
  [HeaderId.CancelMembership]: "Cancel Your Membership",
};

function sectionTableOfContents(header_ids: HeaderId[]): React.ReactElement {
  return (
    <div>
      <ul className="list-disc pl-7">
        {header_ids.map((header_id) => (
          <li>
            <Link href={`#${header_id}`}>{headers[header_id]}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function tableDuesSuggestions(): React.ReactElement {
  interface IncomeSuggestions {
    range: string;
    suggested_amount: React.ReactElement;
  }
  const suggestions: IncomeSuggestions[] = [
    {
      range: "Income",
      suggested_amount: <span>Suggested range (but it's up to you)</span>,
    },
    {
      range: "Below $50,000",
      suggested_amount: <span>$0 - $10</span>,
    },
    {
      range: "$50,000-$100,000",
      suggested_amount: <span>$15-$25</span>,
    },
    {
      range: "$100,000-$150,000",
      suggested_amount: <span>$75</span>,
    },
    {
      range: "$150,000-$200,000",
      suggested_amount: <span>$100</span>,
    },
    {
      range: "$200,000+",
      suggested_amount: (
        <span>
          $100 +{" "}
          <Link href="/support/">
            recurring donation in PayPal of your choice
          </Link>
        </span>
      ),
    },
  ];

  const paddingClasses: string = "pl-20";

  const tableRow = (
    row: IncomeSuggestions,
    index: number
  ): React.ReactElement => {
    if (index == 0) {
      return (
        <thead>
          <tr>
            <td>
              <b>{row.range}</b>
            </td>
            <td className={paddingClasses}>
              <b>{row.suggested_amount}</b>
            </td>
          </tr>
        </thead>
      );
    }
    return (
      <tbody>
        <tr>
          <td>{row.range}</td>
          <td className={paddingClasses}>{row.suggested_amount}</td>
        </tr>
      </tbody>
    );
  };

  return <table>{suggestions.map((row, index) => tableRow(row, index))}</table>;
}

function sectionCurrentDues(): React.ReactElement {
  // TODO: Replace with actual dues status from Stripe or Supabase
  const active: boolean = false;
  const amount: string = "xx.xx";
  const status: string = active ? "active" : "inactive";

  return (
    <div>
      <Heading level={3}>{headers[HeaderId.CurrentDues]}</Heading>
      <p>
        Your current Stripe subscription is <b>${amount}</b> per month, and your
        status is <b>{status}</b>.
      </p>
      {componentStripeDropdown()}
      <p>
        Note: If you would like to update the card that is on file without
        changing your dues amount, leave the dues amount dropdown where it is
        and click the "Update Dues" button. A Stripe popup will appear where you
        can enter new card information.
      </p>
    </div>
  );
}

function sectionMembershipDues(): React.ReactElement {
  return (
    <div>
      <p>
        Membership dues payments are handled via Stripe, which will charge your
        credit or debit card on the same date each month.
      </p>
      <br />
      <p>
        If you need to change your dues payment, just fill in the form again and
        it will be updated. (If you switch your dues to a lower level, our dues
        system automatically pro-rates your next payments, so you may get
        charged a lower partial amount [or nothing] on your next scheduled dues
        payment date. This is ok!)
      </p>
      <br />
      {sectionCurrentDues()}
      <br />
      <Heading id={HeaderId.Suggestions} level={3}>
        {headers[HeaderId.Suggestions]}
      </Heading>
      {tableDuesSuggestions()}
      <br />
      <p>
        Any dues you pay above $10 / month can be counted as a tax-deductible
        donation to Double Union for your taxes or your company's donation
        matching program.
      </p>
      <br />
      <p>
        For example, if you paid $20 / month for a full year, you could include
        a $120 donation to Double Union on your taxes.
      </p>
      <br />
      <p>
        If you want to use your company's donation matching program, you may
        want to set up $10 / month dues here and an additional monthly recurring
        donation through your company's system. If you'd like help setting up
        donation matching, email {componentEmail("board@doubleunion.org")}.
      </p>
    </div>
  );
}

function sectionScholarship(): React.ReactElement {
  return (
    <div>
      <p>
        We gladly welcome and support members who can't afford to pay membership
        dues! That's why any member can request a scholarship due to financial
        need at any time. There is no waiting period before you can apply for a
        scholarship or other restriction on when or how often you can ask for a
        scholarship.
      </p>
      <br />
      <p>
        Your scholarship application will be reviewed by a member of the board
        of directors and either granted or turned down within 2 weeks. We won't
        ask for documentation or proof of financial need, and we won't share
        your scholarship application with anyone else. If you don't hear back
        about your application within 2 weeks, please email{" "}
        {componentEmail("board@doubleunion.org")}.
      </p>
      <br />
      <p>Keep in mind the following: </p>
      <ul className="pl-7 list-disc">
        <li>
          We do not grant scholarships for reasons other than financial need.
          Financial need is defined as: paying $10/month would interfere with
          the member's ability to: pay for rent, food, medical care, transit,
          clothes, schooling, employment-related opportunities, and other
          important parts of life.{" "}
        </li>
        <li>
          Examples of people who would qualify:
          <ul className="pl-7 list-disc">
            <li>long-term unemployed or underemployed people,</li>
            <li>students of many types,</li>
            <li>people working jobs below the Bay Area median wage,</li>
            <li>
              people with significant medical bills relative to their income,
            </li>
            <li>struggling writers or artists,</li>
            <li>people working low-income jobs,</li>
            <li>
              young people with little or no support from their parents, and
            </li>
            <li>retired people whose retirement income is relatively low.</li>
          </ul>
        </li>
        <li>
          Very few people employed full-time in the tech industry in the Bay
          Area will qualify as being in financial need.{" "}
        </li>
        <li>
          In particular, if you are moving away or otherwise unable to visit DU
          in person for a while, and you want to continue being a member, and
          you can afford to pay membership dues, you must still pay membership
          dues.{" "}
        </li>
      </ul>
      <br />
      <b>Paying $10/month would be a financial hardship for me because:</b>
      {/* TODO: Post to /members/users/{user_id}/scholarship_request or whichever new route */}
      <form>
        <Textarea className="border-2 border-gray-300"></Textarea>
        <div className="pt-3">
          <Button color="dark/primary">Submit</Button>
          {/* <Button color="light">Submit</Button> */}
        </div>
      </form>
    </div>
  );
}

function sectionCancelMembership(): React.ReactElement {
  return (
    <div>
      <p>
        If you'd like to cancel your Double Union membership, click{" "}
        <Link href="./cancel">here</Link>. If you have other questions about
        dues and membership, please email{" "}
        {componentEmail("membership@doubleunion.org")} to reach out to the
        membership coordinators.
      </p>
    </div>
  );
}

export default function MembersMembership(): React.ReactElement {
  return (
    <div className="space-y-8">
      <Heading id={HeaderId.ManageMembership} level={1}>
        {headers[HeaderId.ManageMembership]}
      </Heading>
      {sectionTableOfContents([
        HeaderId.UpdateDues,
        HeaderId.ApplyScholarShip,
        HeaderId.CancelMembership,
      ])}
      <Heading id={HeaderId.UpdateDues} level={2}>
        {headers[HeaderId.UpdateDues]}
      </Heading>
      {sectionMembershipDues()}
      <Heading id={HeaderId.ApplyScholarShip} level={2}>
        {headers[HeaderId.ApplyScholarShip]}
      </Heading>
      {sectionScholarship()}
      <Heading id={HeaderId.CancelMembership} level={2}>
        {headers[HeaderId.CancelMembership]}
      </Heading>
      {sectionCancelMembership()}
    </div>
  );
}
