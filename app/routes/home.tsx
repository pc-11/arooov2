import { Welcome } from "../welcome/welcome";
import { Link } from "../../components/ui-toolkit/link";
import { Button } from "../../components/ui-toolkit/button";

import { MembersLink } from "components/core/links";

export function meta() {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return (
    <div>
      <Welcome />
      <div className="mt-8 flex justify-center">
        <MembersLink>
          <Button color="blue">Enter Members Area</Button>
        </MembersLink>
      </div>
    </div>
  );
}
