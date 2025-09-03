import { Badge } from "../../components/ui-toolkit/badge";
import { Button } from "../../components/ui-toolkit/button";
import { Divider } from "../../components/ui-toolkit/divider";
import { Link } from "../../components/ui-toolkit/link";
import { Text } from "../../components/ui-toolkit/text";
import { Textarea } from "../../components/ui-toolkit/textarea";

import { Email } from "../../components/core/email";
import { HeadingComponentUsing } from "../../components/core/heading";
import { CancelLink, SupportLink } from "components/core/links";
import { StripeDropdown } from "components/core/stripe-dropdown";
import { TableOfContents } from "components/core/table-of-contents";

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

const Heading = HeadingComponentUsing<HeaderId>(headers);

const SectionTableOfContents: React.FC = ({}) => {
  var props = {
    headerIds: [
      HeaderId.UpdateDues,
      HeaderId.ApplyScholarShip,
      HeaderId.CancelMembership,
    ],
    headers: headers,
  };

  return <TableOfContents<HeaderId> {...props} />;
};

const TableDuesSuggestions: React.FC = ({}) => {
  interface IncomeSuggestions {
    range: string;
    suggestedAmount: React.ReactElement;
  }
  const suggestions: IncomeSuggestions[] = [
    {
      range: "Below $50,000",
      suggestedAmount: <span>$0 - $10</span>,
    },
    {
      range: "$50,000-$100,000",
      suggestedAmount: <span>$15-$25</span>,
    },
    {
      range: "$100,000-$150,000",
      suggestedAmount: <span>$75</span>,
    },
    {
      range: "$150,000-$200,000",
      suggestedAmount: <span>$100</span>,
    },
    {
      range: "$200,000+",
      suggestedAmount: (
        <span>
          $100 +{" "}
          <SupportLink>recurring donation in PayPal of your choice</SupportLink>
        </span>
      ),
    },
  ];

  const paddingClasses: string = "pl-20";

  return (
    <table>
      <thead>
        <tr>
          <td>
            <b>Income</b>
          </td>
          <td className={paddingClasses}>
            <b>
              <>Suggested range (but it's up to you)</>
            </b>
          </td>
        </tr>
      </thead>
      <tbody>
        {suggestions.map((row, index) => (
          <tr key={index}>
            <td>{row.range}</td>
            <td className={paddingClasses}>{row.suggestedAmount}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const SectionCurrentDues: React.FC = ({}) => {
  // TODO: Replace with actual dues status from Stripe or Supabase
  const active: boolean = false;
  const amount: string = "xx.xx";
  const status: string = active ? "active" : "inactive";

  return (
    <div>
      <Heading id={HeaderId.CurrentDues} level={3} />
      <p>
        Your current Stripe subscription is <b>${amount}</b> per month, and your
        status is <b>{status}</b>.
      </p>
      <StripeDropdown />
      <p>
        Note: If you would like to update the card that is on file without
        changing your dues amount, leave the dues amount dropdown where it is
        and click the "Update Dues" button. A Stripe popup will appear where you
        can enter new card information.
      </p>
    </div>
  );
};

const SectionMembershipDues: React.FC = ({}) => {
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
      <SectionCurrentDues />
      <br />
      <Heading id={HeaderId.Suggestions} level={3} />
      <TableDuesSuggestions />
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
        donation matching, email <Email emailStr="board@doubleunion.org" />
      </p>
    </div>
  );
};

const SectionScholarship: React.FC = ({}) => {
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
        <Email emailStr="board@doubleunion.org" />
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
        <textarea className="w-full max-w-full min-h-10 border-2 border-gray-300 resize" />
        <div className="pt-3">
          <Button color="dark/primary">Submit</Button>
          {/* <Button color="light">Submit</Button> */}
        </div>
      </form>
    </div>
  );
};

const SectionCancelMembership: React.FC = ({}) => {
  return (
    <div>
      <p>
        If you'd like to cancel your Double Union membership, click{" "}
        <CancelLink>here</CancelLink>. If you have other questions about dues
        and membership, please email{" "}
        <Email emailStr="membership@doubleunion.org" /> to reach out to the
        membership coordinators.
      </p>
    </div>
  );
};

export default function MembersMembership(): React.ReactElement {
  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <Heading id={HeaderId.ManageMembership} level={1} />
      <SectionTableOfContents />
      <Heading id={HeaderId.UpdateDues} level={2} />
      <SectionMembershipDues />
      <Heading id={HeaderId.ApplyScholarShip} level={2} />
      <SectionScholarship />
      <Heading id={HeaderId.CancelMembership} level={2} />
      <SectionCancelMembership />
    </div>
  );
}
