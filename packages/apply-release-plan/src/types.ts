import { NewChangeset } from "@fond-of/changesets-types";

export type RelevantChangesets = {
  major: NewChangeset[];
  minor: NewChangeset[];
  patch: NewChangeset[];
};
