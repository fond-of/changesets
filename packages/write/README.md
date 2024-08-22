# @fond-of/changesets-write

Writes a changeset to a file.

```js
import write from "@fond-of/changesets-write";

const changeset = {
  summary: "A description of a minor change",
  releases: [
    { name: "@fond-of/changesets-something", type: "minor" },
    { name: "@fond-of/changesets-something-else", type: "patch" },
  ],
};

const uniqueId = await write(changeset, cwd);
console.log(uniqueId); // orange-foxes-waggle
```

For example, it can convert:

```json
{
  "summary": "A description of a minor change",
  "releases": [
    { "name": "@fond-of/changesets-something", "type": "minor" },
    { "name": "@fond-of/changesets-something-else", "type": "patch" }
  ]
}
```

to

```markdown
---
"@fond-of/changesets-something": minor
"@fond-of/changesets-something-else": patch
---

A description of a minor change
```

This package will take care of generating a unique id for the changeset.
