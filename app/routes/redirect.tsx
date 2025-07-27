import { redirect } from "react-router";

export function loader() {
  return redirect("/members");
}

export default function RedirectToMembers() {
  // This component should never render because of the redirect
  return null;
}
