import { Heading as InnerHeading } from "../../components/ui-toolkit/heading";

type Mappable = string | number | symbol;

export type HeadingProps = {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
} & React.ComponentPropsWithoutRef<"h1" | "h2" | "h3" | "h4" | "h5" | "h6">;

export function Heading({ className, level = 1, ...props }: HeadingProps) {
  return (
    <InnerHeading level={level} {...props}>
      {props.children}
    </InnerHeading>
  );
}

interface HeadingMappableProps<T extends Mappable> {
  id: T;
}

export function HeadingComponentUsing<T extends Mappable>(
  headers: Record<T, string>
) {
  return (props: HeadingProps & HeadingMappableProps<T>) => {
    return <InnerHeading {...props}>{headers[props.id]}</InnerHeading>;
  };
}
