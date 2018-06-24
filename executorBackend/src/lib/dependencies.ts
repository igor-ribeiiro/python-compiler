import axios from "axios";
import { exec } from "node-exec-promise";

export interface Dependency {
  readonly name: string;
  readonly version?: string;
}

export interface ParsedDependency {
  readonly valid: Dependency[];
  readonly invalid: CheckError[];
}

export interface CheckError {
  readonly name: string;
  readonly error: "PKG_NOT_FOUND" | "VER_NOT_FOUND";
}


export function isDependency(d: any): d is Dependency {
  const hasVersion = d.version !== undefined;
  const nameParsing = d.name !== undefined && typeof d.name === "string";

  return nameParsing && (!hasVersion || typeof d.version === "string");
}


export function checkDependencies(dependencies: Dependency[]): Promise<Dependency[]> {
  const dependenciesChecks = dependencies
    .map(d =>
      d.version !== undefined
        ? fetchDependencyWithVersion(d)
        : fetchDependency(d));

  return Promise.all(dependenciesChecks)
    .then(checks =>
      checks.reduce((acc, c) =>
          isDependency(c)
            ? ({ valid: [c, ...acc.valid], invalid: acc.invalid })
            : ({ valid: acc.valid, invalid: [c, ...acc.invalid] }),
        { valid: [], invalid: [] } as ParsedDependency))
    .then(pd => {
      if (pd.invalid.length === 0)
        return pd.valid;
      else
        throw pd.invalid;
    });
}


export function installDependencies(dependencies: Dependency[]) {
  const asString = dependencies
    .map(d =>
      d.version !== undefined
        ? `${d.name}==${d.version}`
        : d.name)
    .join(" ");

  return exec(`pip install ${asString}`);
}


function fetchDependency(d: Dependency): Promise<Dependency | CheckError> {
  return axios.get(`https://pypi.org/pypi/${d.name}/json`)
    .then(res => ({
      name: d.name,
      version: res.data.info.version as string
    }))
    .catch(_ => ({
      name: d.name,
      error: "PKG_NOT_FOUND"
    }));
}


function fetchDependencyWithVersion(d: Dependency): Promise<Dependency | CheckError> {
  return axios.get(`https://pypi.org/pypi/${d.name}/${d.version}/json`)
    .then(_ => d)
    .catch(_ => ({
      name: d.name,
      error: "VER_NOT_FOUND"
    }));
}

