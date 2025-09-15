import { Heading } from "../../components/ui-toolkit/heading";
import { Link } from "../../components/ui-toolkit/link";
import { Text } from "../../components/ui-toolkit/text";
import { useState } from "react";
import { LinkIcon } from "../../components/core/icons";

import { Email } from "components/core/email";
import {
  GithubV1Link,
  GoogleCalendarLink,
  GoogleDriveShortcutLink,
  MembersCalendarLink,
  MembersFoldersListLink,
  MembersMailingListLink,
  SlackLink,
} from "components/core/links";

const SectionBookmarks: React.FC = () => {
  return (
    <ul className="list-disc pl-7">
      <li>
        <MembersMailingListLink>Members Mailing List</MembersMailingListLink>
      </li>
      <li>
        <MembersFoldersListLink>
          Member folder in Google drive
        </MembersFoldersListLink>{" "}
        &mdash; For easy access,{" "}
        <GoogleDriveShortcutLink>
          add a shortcut in Google Calendar
        </GoogleDriveShortcutLink>
      </li>
      <li>
        <MembersCalendarLink>Members calendar</MembersCalendarLink> &mdash; This
        is a view-only version of the calendar. To add or edit these events, go
        to <GoogleCalendarLink>Google Calendar</GoogleCalendarLink> (it should
        show up among your calendars).
      </li>
      <li>
        <SlackLink>Members Slack chat</SlackLink>
      </li>
      <li>
        <GithubV1Link>DU web application code on Github</GithubV1Link>
      </li>
    </ul>
  );
};

interface MemberTableProps {
  placeholderText?: string;
}

const SectionMemberTable: React.FC<MemberTableProps> = ({
  placeholderText,
}) => {
  return (
    <div className="w-full min-h-40 border-1 flex items-center justify-center">
      {placeholderText}
    </div>
  );
};

export default function MembersHome() {
  return (
    <>
      <Heading id="space-access" level={2}>
        Space Access
      </Heading>
      <s>
        {" "}
        Note: You must be at the space and connected to the Wi-Fi to unlock the
        door.
      </s>
      <table>
        <tbody>
          <tr>
            <td className="text-right pr-1">
              <b>ssid:</b>
            </td>
            <td>Double Union</td>
          </tr>
          <tr>
            <td className="text-right pr-1">
              <b>password:</b>
            </td>
            <td>meritocracy is a joke</td>
          </tr>
        </tbody>
      </table>
      <Heading level={2}>Bookmarks for Members Access</Heading>
      <SectionBookmarks />
      <Heading level={2}>Admins</Heading>
      <p>
        This internal DU app is administered by Membership Coordinators{" "}
        <Email emailStr="membership@doubleunion.org" /> and Board Members{" "}
        <Email emailStr="board@doubleunion.org" />. Members with admin access:
      </p>
      <SectionMemberTable placeholderText="adminTable" />
      <Heading level={2}>Members</Heading>
      <SectionMemberTable placeholderText="membersTable" />
    </>
  );
}
