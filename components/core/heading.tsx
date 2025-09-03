import { Heading as InnerHeading } from "../../components/ui-toolkit/heading";
import type { HeadingProps } from "../../components/ui-toolkit/heading";

type InjectedHeadingEnum = string | number | symbol;

// HeadingMappableProps exists solely to require the id in custom Headings
interface HeadingMappableProps<T extends InjectedHeadingEnum> {
  id: T;
}

// HeadingComponentsUsing allows for simplified declarations for headings
// instead of requiring the lookup of pre-declared id per heading.
// This is intended to supplement the pre-declarations that are already
// required for Table Of Contents. See ./table-of-contents.tsx
// Usage:
// const PerPageHeading = HeadingComponentUsing<PageSpecificHeaderId>
// <PerPageHeading id={PageSpecificHeaderId.id0} />
export function HeadingComponentUsing<T extends InjectedHeadingEnum>(
  headers: Record<T, string>
) {
  return (props: HeadingProps & HeadingMappableProps<T>) => {
    return <InnerHeading {...props}>{headers[props.id]}</InnerHeading>;
  };
}
