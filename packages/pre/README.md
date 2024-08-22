# @fond-of/changesets-pre

[![View changelog](https://img.shields.io/badge/changelogs.xyz-Explore%20Changelog-brightgreen)](https://changelogs.xyz/@fond-of/changesets-pre)

Enter and exit pre mode in a Changesets repo.

## Usage

```ts
import { enterPre, exitPre } from "@fond-of/changesets-pre";

await enterPre(cwd, tag);

let preState = await readPreState(cwd);

// version packages with @fond-of/changesets-cli or get a release plan and apply it
await exitPre(cwd);
```

This package is used by internally by Changesets to enter and exit pre mode along with reading the pre state for the `publish` and `version` commands, you should only need it if you're using `@fond-of/changesets-assemble-release-plan`, implementing Changesets or want to enter or exit pre mode programmatically.

## Types

```ts
import { PreState } from "@fond-of/changesets-types";

export function enterPre(cwd: string, tag: string): Promise<void>;
export function exitPre(cwd: string): Promise<void>;
export function readPreState(cwd: string): Promise<PreState>;
```
