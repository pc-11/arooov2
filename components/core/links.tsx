import { link } from "fs";
import { Link } from "../../components/ui-toolkit/link";

// Defines a list of external link constants, to faciliate easier changing of
// links consistent across pages.

function linkComponentWithHref(href: string) {
  return function linkComponent({ ...props }) {
    return (
      <Link href={href} {...props}>
        {props.children}
      </Link>
    );
  };
}

export const ApplicationCriteriaLink = linkComponentWithHref(
  "https://docs.google.com/document/d/12R7utXAiyCK55XEP8cPscUqu2CXAj-hL5jXE-MaJdgE/edit#heading=h.y6eimvxrwzvf"
);

export const CancelLink = linkComponentWithHref("/cancel");

export const ConfidentialityPolicyLink = linkComponentWithHref(
  "https://docs.google.com/document/d/1X7UEBNjojwB90Wuewfk4IiDpV2oL6av9mqdD8F0zXzY/edit?tab=t.0#heading=h.87ou37tss0ha"
);

export const GithubV1Link = linkComponentWithHref(
  "https://github.com/doubleunion"
);

export const GoogleCalendarLink = linkComponentWithHref(
  "https://calendar.google.com/calendar/"
);

export const GoogleDriveShortcutLink = linkComponentWithHref(
  "https://support.google.com/drive/answer/2375057?hl=en"
);

export const GravatarSupportLink = linkComponentWithHref(
  "https://en.gravatar.com/support/what-is-gravatar/"
);

export const MembersCalendarLink = linkComponentWithHref(
  "https://www.google.com/calendar/embed?src=br12b81lfe63rggddlg0k92mko@group.calendar.google.com&ctz=America/Los_Angeles"
);

export const MembersFoldersListLink = linkComponentWithHref(
  "https://drive.google.com/folderview?id=0B6a_aDP-2fOVV2FQLW5FVTZ2Mjg"
);

export const MembersMailingListLink = linkComponentWithHref(
  "https://groups.google.com/a/doubleunion.org/forum/#!forum/members"
);

export const MembersPublicListLink = linkComponentWithHref(
  "https://www.doubleunion.org/membership#current-members"
);

export const MembersLink = linkComponentWithHref("/members");

export const SlackLink = linkComponentWithHref(
  "https://doubleunion.slack.com/"
);

export const SupportLink = linkComponentWithHref("/support");
