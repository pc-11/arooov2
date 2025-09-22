import { Link, redirect, useLoaderData } from "react-router";
import { Heading } from "../../components/ui-toolkit/heading";
import React, { useState } from "react";

import type { Route } from "./+types/members.home";

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
import { Role, RoleContext } from "components/auth/roles";

interface Member {
  id: string;
  name: string;
  username: string;
  status: string;
}

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
  members?: Member[];
  placeholderText?: string;
}

const SectionMemberTable: React.FC<MemberTableProps> = ({ members }) => {
  return (
    <table className="table-fixed w-full border-collapse text-sm mt-4">
      <thead className="">
        <tr className="w-1/3 font-bold h-10">
          <td className="text-left">Name</td>
          <td className="text-left">Username</td>
          <td className="text-left">Status</td>
        </tr>
      </thead>
      <tbody>
        {members?.map((member: Member) => (
          <tr
            key={member.id}
            className="border-t-2 border-gray-300/90 align-center"
          >
            <td className="pl-1 pt-1.75 pb-1.75">
              <div className="flex space-x-1 self-center">
                <img src="/placeholder-avatar.jpg"></img>
                <Link
                  to={`/members/profile/${member.id}`}
                  className="self-center"
                >
                  {member.name}
                </Link>
              </div>
            </td>
            <td className="p-0">
              <Link to={`/members/profile/${member.id}`}>
                {member.username}
              </Link>
            </td>
            <td className="p-0">{member.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export async function loader({ request, context }: Route.LoaderArgs) {
  let role: Role | null = context.get(RoleContext);
  if (!role) {
    throw new Response(null, { status: 404, statusText: "Not Found" });
  }
  if (role?.isProspectiveMember()) {
    console.log("is an applicant! sending to application");
    return redirect("/members/applications");
  }
}

export default function MembersHome() {
  let members = [
    {
      id: "b26dc816-7d8c-47c4-a3fb-712ff7650e76",
      name: "Member 1",
      username: "member1@gmail.com",
      status: "Key Member",
    },
    {
      id: "2",
      name: "Member 2",
      username: "member2@gmail.com",
      status: "2Key Member",
    },
  ];

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
      <SectionMemberTable members={members} />
      <Heading level={2}>Members</Heading>
      <SectionMemberTable placeholderText="membersTable" />
    </>
  );
}
