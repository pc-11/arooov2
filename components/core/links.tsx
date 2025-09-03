import { Link } from "../../components/ui-toolkit/link";

// Defines a list of external link constants, to faciliate easier changing of
// links consistent across pages.

export function ApplicationCriteriaLink({ ...props }) {
  return (
    <Link
      href="https://docs.google.com/document/d/12R7utXAiyCK55XEP8cPscUqu2CXAj-hL5jXE-MaJdgE/edit#heading=h.y6eimvxrwzvf"
      {...props}
    >
      {props.children}
    </Link>
  );
}

export function CancelLink({ ...props }) {
  return (
    <Link href="/cancel" {...props}>
      {props.children}
    </Link>
  );
}

export function ConfidentialityPolicyLink({ ...props }) {
  return (
    <Link
      href="https://docs.google.com/document/d/1X7UEBNjojwB90Wuewfk4IiDpV2oL6av9mqdD8F0zXzY/edit?tab=t.0#heading=h.87ou37tss0ha"
      {...props}
    >
      {props.children}
    </Link>
  );
}

export function MembersLink({ ...props }) {
  return (
    <Link href="/members" {...props}>
      {props.children}
    </Link>
  );
}

export function SupportLink({ ...props }) {
  return (
    <Link href="/support" {...props}>
      {props.children}
    </Link>
  );
}
