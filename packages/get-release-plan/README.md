# @fond-of/changesets-get-release-plan

[![View changelog](https://img.shields.io/badge/changelogs.xyz-Explore%20Changelog-brightgreen)](https://changelogs.xyz/@fond-of/changesets-get-release-plan)

A function that reads information about the current repository

```js
import getReleasePlan from "@fond-of/changesets-get-release-plan";

const releasePlan = await getReleasePlan(cwd, since, passedConfig);
```

## cwd: string

The directory to run `getReleasePlan` in - most often `process.cwd()`

## since: string

Sets whether to use all changesets present, or only those changesets that are new since the branch
diverged from another one.

## passedConfig?: Config

The changeset config options as defined in `@fond-of/changesets-types`. This is optional, and can be used to overwrite any written config options.
