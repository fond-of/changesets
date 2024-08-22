# @fond-of/changesets-parse

[![View changelog](https://img.shields.io/badge/changelogs.xyz-Explore%20Changelog-brightgreen)](https://changelogs.xyz/@fond-of/changesets-parse)

Parses a changeset from its written format to a data object.

```js
import parse from "@fond-of/changesets-parse";

const changeset = `---
"@fond-of/changesets-something": minor
"@fond-of/changesets-something-else": patch
---

A description of a minor change`;

const parsedChangeset = parse(changeset);
```

For example, it can convert:

```md
---
"@fond-of/changesets-something": minor
"@fond-of/changesets-something-else": patch
---

A description of a minor change
```

to

```json
{
  "summary": "A description of a minor change",
  "releases": [
    { "name": "@fond-of/changesets-something", "type": "minor" },
    { "name": "@fond-of/changesets-something-else", "type": "patch" }
  ]
}
```

Note that this is not quite a complete Changeset for most tools as it lacks an `id`.

For written changesets, the id is normally given as the file name, which parse is not aware of.
