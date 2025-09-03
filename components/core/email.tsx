import { Link } from "../../components/ui-toolkit/link";

interface EmailComponentProps {
  emailStr: string;
}

export function Email({ emailStr, ...props }: EmailComponentProps) {
  return <Link href={`mailto:${emailStr}`}>{emailStr}</Link>;
}
