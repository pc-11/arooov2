import { type RouteConfig, index, route, layout, prefix } from "@react-router/dev/routes";

export default [
  index("routes/redirect.tsx"),
  ...prefix("members", [
    layout("routes/members.tsx", [
      index("routes/members.home.tsx"),
      route("applications", "routes/members.applications.tsx"),
      route("profile", "routes/members.profile.tsx"),
      route("membership", "routes/members.membership.tsx"),
    ]),
  ]),
] satisfies RouteConfig;
