import type { Route as Route } from "./+types/logout";
import {
  data as wrap_data,
  useLoaderData,
  Navigate,
  useNavigate,
} from "react-router";

import { supabaseClientFromRequest } from "components/auth/client";
import { Heading } from "components/ui-toolkit/heading";
import type { Database, Tables } from "database.types";

import { createHash } from "crypto";
import { useToast } from "components/core/toast";
import { useEffect } from "react";

type Profile = Tables<"profile">;
type ProfileUpdate = Database["public"]["Tables"]["profile"]["Update"];

interface Social {
  key: string;
  label: string;
  text: string;
}

interface RenderableData {
  profile: Profile;
  socials: Social[];
  gravatar_url?: URL;
}

export async function loader({
  request,
  params,
}: {
  request: Route.LoaderArgs["request"];
  params: { profile_id?: string };
}) {
  if (!params?.profile_id) {
    return null;
  }

  const { supabaseClient, headers } = supabaseClientFromRequest(request);
  const { data } = await supabaseClient
    .from("profile")
    .select("*")
    .filter("user_id", "eq", params.profile_id);
  if (!data || data.length != 1) {
    return null;
  }

  let profile = data[0] as Profile;

  var socials: Social[] = [];
  if (profile?.social_twitter) {
    socials.push({
      key: "twitter",
      label: "Twitter url",
      text: profile.social_twitter,
    });
  }
  if (profile?.social_facebook) {
    socials.push({
      key: "facebook",
      label: "Facebook url",
      text: profile.social_facebook,
    });
  }
  if (profile?.social_website) {
    socials.push({
      key: "website",
      label: "Website url",
      text: profile.social_website,
    });
  }
  if (profile?.social_linkedin) {
    socials.push({
      key: "linkedin",
      label: "LinkedIn url",
      text: profile.social_linkedin,
    });
  }
  if (profile?.social_blog) {
    socials.push({
      key: "blog",
      label: "Blog url",
      text: profile.social_blog,
    });
  }
  let isValidUrl: (maybeUrl: string) => boolean = (maybeUrl: string) => {
    try {
      new URL(maybeUrl);
      return true;
    } catch (e) {
      return false;
    }
  };
  socials = socials.filter((social) => {
    return isValidUrl(social.text);
  });

  const hash = createHash("md5")
    .update(profile.email_gravatar ?? "test@example.com")
    .digest("hex");
  let gravatarSize: number = 150;

  let renderableData: RenderableData = {
    profile: profile,
    socials: socials,
    gravatar_url: new URL(
      `https://www.gravatar.com/avatar/${hash}?s=${gravatarSize}`
    ),
  };

  return wrap_data(renderableData, { headers });
}

export default function Component() {
  let data: RenderableData | null = useLoaderData<typeof loader>();
  let { showToast } = useToast();

  if (!data) {
    showToast({ message: "Member not found!", onsetDelay: 350, only: true });
    return <Navigate to="/members#members" replace={true}></Navigate>;
  }
  let profile = data.profile;

  return (
    <div className="space-y-5">
      <div className="flex">
        <img
          src={data.gravatar_url?.href ?? "/placeholder-avatar.jpg"}
          className="w-32 h-32"
        ></img>
        <div className="pl-4">
          <Heading level={1} className="mt-1!">
            {profile.display_name}
          </Heading>
          <Heading level={4} className="mt-3!">
            {profile.pronouns}
          </Heading>
          <Heading level={4} className="mt-1!">
            {profile.email_display}
          </Heading>
        </div>
      </div>
      <div>
        {data.socials.map((social) => (
          <div
            key={social.key}
            className="flex w-full py-2 border-t-2 border-gray-300/50"
          >
            <div className="w-1/3">{social.label}</div>
            <div className="w-2/3">
              <a href={social.text}>{social.text}</a>
            </div>
          </div>
        ))}
      </div>
      {profile?.summary ? (
        <>
          {" "}
          <Heading level={4}>Tell us a Little About Yourself</Heading>
          <p>{profile.summary}</p>
        </>
      ) : (
        <></>
      )}
      {profile.public_reasons && profile?.reasons ? (
        <>
          {" "}
          <Heading level={4}>
            Why are you interested in joining Double Union?
          </Heading>
          <p>{profile.reasons}</p>
        </>
      ) : (
        <></>
      )}
      {profile.public_projects && profile?.projects ? (
        <>
          {" "}
          <Heading level={4}>
            What would you like to work on in the space?
          </Heading>
          <p>{profile.projects}</p>
        </>
      ) : (
        <></>
      )}
      {profile.public_skills && profile?.skills ? (
        <>
          {" "}
          <Heading level={4}>
            What skills are you most interested in learning, improving, and/or
            teaching?
          </Heading>
          <p>{profile.projects}</p>
        </>
      ) : (
        <></>
      )}
    </div>
  );
}
