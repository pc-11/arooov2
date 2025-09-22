import type { Route } from "./+types/members.applications.edit";

export async function loader({ request, context }: Route.LoaderArgs) {
  return null;
}

export default function Component({}: Route.ComponentProps) {
  return <div></div>;
}
