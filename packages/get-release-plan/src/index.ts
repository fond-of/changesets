import assembleReleasePlan from "@fond-of/changesets-assemble-release-plan";
import readChangesets from "@fond-of/changesets-read";
import { read } from "@fond-of/changesets-config";
import { Config, ReleasePlan } from "@fond-of/changesets-types";
import { getPackages } from "@manypkg/get-packages";
import { readPreState } from "@fond-of/changesets-pre";

export default async function getReleasePlan(
  cwd: string,
  sinceRef?: string,
  passedConfig?: Config,
  configName = "config.json"
): Promise<ReleasePlan> {
  const packages = await getPackages(cwd);
  const preState = await readPreState(cwd);
  const readConfig = await read(cwd, packages, configName);
  const config = passedConfig ? { ...readConfig, ...passedConfig } : readConfig;
  const changesets = await readChangesets(cwd, sinceRef);

  return assembleReleasePlan(changesets, packages, config, preState);
}
