# Get Dependents Graph

[![View changelog](https://img.shields.io/badge/changelogs.xyz-Explore%20Changelog-brightgreen)](https://changelogs.xyz/@fond-of/changesets-get-dependents-graph)

Small helper utility extracted from bolt to get a graph of relationships between packages.

```ts
import { getDependentsGraph } from "@fond-of/changesets-get-dependents-graph";
import { getPackages } from "@manypkg/get-packages";

let { graph, valid } = getDependentsGraph(await getPackages(cwd));
```

Mostly published for use in [changesets](https://www.npmjs.com/package/@fond-of/changesets-cli)
