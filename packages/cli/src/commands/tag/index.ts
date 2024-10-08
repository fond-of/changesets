import * as git from "@fond-of/changesets-git";
import { log } from "@fond-of/changesets-logger";
import { shouldSkipPackage } from "@fond-of/changesets-should-skip-package";
import { Config } from "@fond-of/changesets-types";
import { getPackages } from "@manypkg/get-packages";
import { getUntaggedPackages } from "../../utils/getUntaggedPackages";

export default async function tag(cwd: string, config: Config) {
  const { packages, tool } = await getPackages(cwd);

  const allExistingTags = await git.getAllTags(cwd);

  const taggablePackages = packages.filter(
    (pkg) =>
      !shouldSkipPackage(pkg, {
        ignore: config.ignore,
        allowPrivatePackages: config.privatePackages.tag,
      })
  );

  for (const { name, newVersion } of await getUntaggedPackages(
    taggablePackages,
    cwd,
    tool
  )) {
    const tag = tool !== "root" ? `${name}@${newVersion}` : `v${newVersion}`;

    if (allExistingTags.has(tag)) {
      log("Skipping tag (already exists): ", tag);
    } else {
      log("New tag: ", tag);
      await git.tag(tag, cwd);
    }
  }
}
