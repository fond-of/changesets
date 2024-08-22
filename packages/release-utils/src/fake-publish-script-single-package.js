/* eslint-disable import/no-commonjs */
/* eslint-disable import/no-extraneous-dependencies */
const git = require("@fond-of/changesets-git");

console.log("🦋 New tag: v1.0.0");

git.tag("v1.0.0", process.cwd());
