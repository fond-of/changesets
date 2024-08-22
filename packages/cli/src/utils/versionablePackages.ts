import { Config } from "@fond-of/changesets-types";
import { getChangedPackagesSinceRef } from "@fond-of/changesets-git";
import { shouldSkipPackage } from "@fond-of/changesets-should-skip-package";

export async function getVersionableChangedPackages(
  config: Config,
  {
    cwd,
    ref,
  }: {
    cwd: string;
    ref?: string;
  }
) {
  const changedPackages = await getChangedPackagesSinceRef({
    ref: ref ?? config.baseBranch,
    changedFilePatterns: config.changedFilePatterns,
    cwd,
  });
  return changedPackages.filter(
    (pkg) =>
      !shouldSkipPackage(pkg, {
        ignore: config.ignore,
        allowPrivatePackages: config.privatePackages.version,
      })
  );
}
