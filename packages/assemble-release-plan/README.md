# Assemble Release Plan

[![View changelog](https://img.shields.io/badge/changelogs.xyz-Explore%20Changelog-brightgreen)](https://changelogs.xyz/@fond-of/changesets-assemble-release-plan)

Assemble a release plan for changesets from data about a repository.

Usage

```ts
import assembleReleasePlan from "@fond-of/changesets-assemble-release-plan";
import readChangesets from "@fond-of/changesets-read";
import { read } from "@fond-of/changesets-config";
import { getPackages } from "@manypkg/get-packages";
import { readPreState } from "@fond-of/changesets-pre";

const packages = await getPackages(cwd);
const preState = await readPreState(cwd);
const config = await read(cwd, packages);
const changesets = await readChangesets(cwd, sinceRef);

const releasePlan = assembleReleasePlan(changesets, packages, config, preState);
```

Signature

```ts
import { NewChangeset, Config, ReleasePlan } from "@fond-of/changesets-types";
import { Packages } from "@manypkg/get-packages";

assembleReleasePlan = (
  changesets: NewChangeset[],
  packages: Packages,
  config: Config
) => ReleasePlan;
```

This package exists so assembling a release plan can be done without reading from disc.
This is useful primarily for testing within the changesets project, and when you cannot
run commands within the repository you want a release plan for (some CI cases).

For most cases, you should use `@fond-of/changesets-get-release-plan` which will read local changeset
files, config, and workspaces, to assemble the release plan from.
