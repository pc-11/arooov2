import { LinkIcon } from "../../components/core/icons";
import { Heading as InnerHeading } from "../../components/ui-toolkit/heading";
import type { HeadingProps } from "../../components/ui-toolkit/heading";
import { Link } from "../../components/ui-toolkit/link";

import { useState } from "react";

type InjectedHeadingEnum = string | number | symbol;

// HeadingMappableProps exists solely to require the id in custom Headings
interface HeadingMappableProps<T extends InjectedHeadingEnum> {
  id: T;
  copyable?: boolean;
  linkable?: boolean;
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
    const headingOnly = (
      <InnerHeading {...props}>
        {props.linkable ?? false ? (
          <Link href={`#${props.id}`} className="active:black">
            {headers[props.id]}
          </Link>
        ) : (
          `${headers[props.id]}`
        )}
      </InnerHeading>
    );

    if (props.copyable ?? true) {
      return headingOnly;
    }

    const [copied, setCopied] = useState(false);

    const copyLink = () => {
      const link = `${window.location.origin}${window.location.pathname}#${props.id}`;
      navigator.clipboard.writeText(link).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 800);
      });
    };

    return (
      <div className="group flex items-baseline gap-2">
        {headingOnly}
        <button
          onClick={copyLink}
          className="text-sm text-gray-500 hover:text-gray-700 opacity-0 group-hover:opacity-100 transition-opacity duration-75"
        >
          {copied ? "Copied!" : <LinkIcon className="w-6 h-6" />}
        </button>
      </div>
    );
  };
}
