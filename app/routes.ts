import {
  type RouteConfig,
  index,
  route,
  layout,
  prefix,
} from "@react-router/dev/routes";

export default [
  index("routes/redirect.tsx"),
  ...prefix("members", [
    layout("routes/members.tsx", [
      index("routes/members.home.tsx"),
      route("applications", "routes/members.applications.tsx"),
      route(
        "applications/:application_id",
        "routes/members.applications.detail.tsx"
      ),
      route(
        "applications/:application_id/edit",
        "routes/members.applications.edit.tsx"
      ),
      route("profile", "routes/members.profile.tsx"),
      route("/:profile_id", "routes/members.profile.detail.tsx"),
      route("membership", "routes/members.membership.tsx"),
    ]),
  ]),
  route("auth-callback", "routes/auth-callback.tsx"),
  route("link-identity", "routes/link-identity.tsx"),
  route("signin", "routes/signin.tsx"),
  route("logout", "routes/logout.tsx"),
] satisfies RouteConfig;
