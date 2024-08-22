## @fond-of/changesets-test-utils

> Utilities for testing @fond-of/changesets-\* packages

### Utilities

#### temporarilySilenceLogs

Silence the logs created but the `@fond-of/changesets-logger` packages.

**Usage**

```
// index.test.ts
import { temporarilySilenceLogs } from "@fond-of/changesets-test-utils";

temporarilySilenceLogs();
```
