import { Heading } from "../../components/ui-toolkit/heading";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui-toolkit/table";
import { Input } from "../../components/ui-toolkit/input";
import { useMemo, useState } from "react";

import {
  ApplicationCriteriaLink,
  ConfidentialityPolicyLink,
} from "components/core/links";

interface Sponsor {}
interface Comment {}

interface Application {
  name: string;
  submitted: Date;
  sponsors: Sponsor[];
  comments: Comment[];
  yesVotes: number;
  noVotes: number;
}

const fakeApplications: Application[] = [
  {
    name: "Alice",
    submitted: new Date("2024-07-29"),
    sponsors: ["1", "2"],
    comments: [],
    yesVotes: 5,
    noVotes: 0,
  },
  {
    name: "Carol",
    submitted: new Date("2024-07-28"),
    sponsors: ["2"],
    comments: [],
    yesVotes: 3,
    noVotes: 1,
  },
  {
    name: "Eve",
    submitted: new Date("2024-07-27"),
    sponsors: [],
    comments: [],
    yesVotes: 4,
    noVotes: 0,
  },
  {
    name: "Grace",
    submitted: new Date("2024-07-26"),
    sponsors: [],
    comments: [],
    yesVotes: 10,
    noVotes: 0,
  },
  {
    name: "Heidi",
    submitted: new Date("2024-07-25"),
    sponsors: [],
    comments: [],
    yesVotes: 1,
    noVotes: 2,
  },
];

// Add calculated / pseudo-columns here.
type SortableKeys = keyof Application | "enoughVotes";

const tableHeaders: { key: SortableKeys; label: string }[] = [
  { key: "name", label: "Name" },
  { key: "submitted", label: "Submitted" },
  { key: "enoughVotes", label: "Enough Votes?" },
  { key: "sponsors", label: "Sponsors" },
  { key: "comments", label: "Comments" },
  { key: "yesVotes", label: "Yes" },
  { key: "noVotes", label: "No" },
];

interface ApplicationTableProps {
  applications: Application[];

  simplifyEntryDisplay?: boolean;
}

// SectionApplicationsTable is an interactive table for
// sorting and viewing applications
const SectionApplicationsTable: React.FC<ApplicationTableProps> = ({
  applications,
  ...props
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortConfig, setSortConfig] = useState<{
    key: SortableKeys;
    direction: "ascending" | "descending";
  } | null>(null);

  const hasEnoughVotes = (yesVotes: number, noVotes: number) => {
    return yesVotes >= 4 || noVotes > 1;
  };

  // Given a sortConfig, orders the applications
  const processedApplications = useMemo(() => {
    const sortedApps = [...applications];
    if (sortConfig !== null) {
      sortedApps.sort((a, b) => {
        let aValue: any;
        let bValue: any;

        if (sortConfig.key === "enoughVotes") {
          aValue = hasEnoughVotes(a.yesVotes, a.noVotes);
          bValue = hasEnoughVotes(b.yesVotes, b.noVotes);
        } else {
          aValue = a[sortConfig.key as keyof Application];
          bValue = b[sortConfig.key as keyof Application];
        }

        if (aValue < bValue) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }

    // Transforms the data of the table into user-displayable formats,
    // which are also used for sorting and filtering.
    return sortedApps.map((app) => ({
      name: app.name,
      submitted: app.submitted.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      enoughVotes: hasEnoughVotes(app.yesVotes, app.noVotes)
        ? "enough"
        : "not yet",
      sponsors: app.sponsors.length.toString(),
      comments: app.comments.length.toString(),
      yesVotes: app.yesVotes.toString(),
      noVotes: app.noVotes.toString(),
    }));
  }, [sortConfig]);

  // Given a searchQuery, filters the applications
  const filteredApplications = useMemo(() => {
    if (!searchQuery) {
      return processedApplications;
    }
    const searchStr = searchQuery.toLowerCase();
    return processedApplications.filter((app) =>
      Object.values(app).some((value) =>
        value.toLowerCase().includes(searchStr)
      )
    );
  }, [processedApplications, searchQuery]);

  // Given a sortConfig, toggles the sort direction
  const requestSort = (key: SortableKeys) => {
    let direction: "ascending" | "descending" = "ascending";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "ascending"
    ) {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  // Given a sortConfig, returns the correct UI indicator
  const getSortIndicator = (key: SortableKeys) => {
    if (!sortConfig || sortConfig.key !== key) {
      return null;
    }
    return sortConfig.direction === "ascending" ? " ▲" : " ▼";
  };

  return (
    <div>
      <p>
        As guided by our{" "}
        <ConfidentialityPolicyLink>
          Confidentiality Policy
        </ConfidentialityPolicyLink>
        , please keep all information about people's individual applications
        (such as contents, comments from members, and votes) confidential among
        DU members. The "Enough Votes?" column is looking for 4+ yes votes or
        more than 1 no vote, which is enough votes to make a decision per our
        <ApplicationCriteriaLink> application criteria</ApplicationCriteriaLink>
        . Members also need to have at least one sponsor to be accepted (so
        someone with lots of yeses but no sponsor can't be accepted).{" "}
      </p>
      <div className="h-10 flex items-baseline mb-5 justify-end">
        <label htmlFor="search_field" className="mt-5 mb-5">
          Search:
        </label>
        <Input
          id="search_field"
          type="text"
          placeholder="Search applications..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="ml-3 max-w-40 border-1"
        />
      </div>
      <table className="w-full">
        <TableHead>
          <TableRow>
            {tableHeaders.map(({ key, label }) => (
              <TableHeader
                key={key}
                onClick={() => requestSort(key)}
                style={{ cursor: "pointer" }}
                className="text-left"
              >
                <b className="text-black">{label}</b>
                {getSortIndicator(key)}
              </TableHeader>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredApplications.map((app) => (
            <TableRow key={app.name}>
              {Object.values(app).map((value, index) => (
                <TableCell key={index}>{value}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </table>

      <p className="text-sm text-gray-500 mt-2">
        {props.simplifyEntryDisplay ?? false ? (
          <span>
            Displaying {filteredApplications.length} of {applications.length}{" "}
            applications.
          </span>
        ) : (
          <span>
            Showing 1 to {filteredApplications.length} of{" "}
            {filteredApplications.length} entries (filtered from{" "}
            {applications.length} total entries)
          </span>
        )}
      </p>
    </div>
  );
};

export default function MembersApplications(): React.ReactElement {
  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <Heading level={1}>Submitted Applications</Heading>
      <SectionApplicationsTable
        applications={fakeApplications}
        simplifyEntryDisplay={true}
      />
      <Heading level={2}>Applicant Email Addresses</Heading>
    </div>
  );
}
