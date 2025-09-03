import { Link } from "../../components/ui-toolkit/link";

type Mappable = string | number | symbol;

export interface TableOfContentProps<T extends Mappable> {
  headerIds: T[];
  headers: Record<T, string>;
}

export function TableOfContents<T extends Mappable>({
  headerIds,
  headers,
}: TableOfContentProps<T>) {
  return (
    <div>
      <ul className="list-disc pl-7">
        {headerIds.map((headerId) => (
          <li key={String(headerId)}>
            <Link href={`#${String(headerId)}`}>{headers[headerId]}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
