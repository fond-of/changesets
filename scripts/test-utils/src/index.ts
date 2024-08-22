import fixturez from "fixturez";
import spawn from "spawndamnit";
import path from "path";
import fs from "fs-extra";

/**
 * Reason for eslint disable import/no-commonjs
 * Technically reassigning imports is not allowed and
 * Rollup errors at compile time on this(but the Babel
 * transform that's running in jest makes it work there),
 * making this a require should be fine.
 */
// eslint-disable-next-line import/no-commonjs
const logger = require("@fond-of/changesets-logger");

const createLogSilencer = () => {
  const originalLoggerError = logger.error;
  const originalLoggerInfo = logger.info;
  const originalLoggerLog = logger.log;
  const originalLoggerWarn = logger.warn;
  const originalLoggerSuccess = logger.success;

  const originalConsoleError = console.error;
  const originalConsoleInfo = console.info;
  const originalConsoleLog = console.log;
  const originalConsoleWarn = console.warn;

  const originalStdoutWrite = process.stdout.write;
  const originalStderrWrite = process.stderr.write;

  return {
    setup() {
      logger.error = jest.fn();
      logger.info = jest.fn();
      logger.log = jest.fn();
      logger.warn = jest.fn();
      logger.success = jest.fn();

      console.error = jest.fn();
      console.info = jest.fn();
      console.log = jest.fn();
      console.warn = jest.fn();

      process.stdout.write = jest.fn();
      process.stderr.write = jest.fn();

      return () => {
        logger.error = originalLoggerError;
        logger.info = originalLoggerInfo;
        logger.log = originalLoggerLog;
        logger.warn = originalLoggerWarn;
        logger.success = originalLoggerSuccess;

        console.error = originalConsoleError;
        console.info = originalConsoleInfo;
        console.log = originalConsoleLog;
        console.warn = originalConsoleWarn;

        process.stdout.write = originalStdoutWrite;
        process.stderr.write = originalStderrWrite;
      };
    },
  };
};

export const silenceLogsInBlock = () => {
  const silencer = createLogSilencer();

  let dispose: () => void | undefined;

  beforeEach(() => {
    dispose = silencer.setup();
  });
  afterEach(() => {
    dispose!();
  });
};

export const temporarilySilenceLogs =
  (testFn: () => Promise<void> | void) => async () => {
    const silencer = createLogSilencer();
    const dispose = silencer.setup();
    try {
      await testFn();
    } finally {
      dispose();
    }
  };

let f = fixturez(__dirname);

export interface Fixture extends Record<string, string> {}

export async function testdir(dir: Fixture) {
  const temp = f.temp();
  await Promise.all(
    Object.keys(dir).map(async (filename) => {
      const fullPath = path.join(temp, filename);
      await fs.outputFile(fullPath, dir[filename]);
    })
  );
  return temp;
}

export const tempdir = f.temp;

export async function gitdir(dir: Fixture) {
  const cwd = await testdir(dir);
  await spawn("git", ["init"], { cwd });
  // so that this works regardless of what the default branch of git init is and for git versions that don't support --initial-branch(like our CI)
  {
    const { stdout } = await spawn(
      "git",
      ["rev-parse", "--abbrev-ref", "HEAD"],
      { cwd }
    );
    if (stdout.toString("utf8").trim() !== "main") {
      await spawn("git", ["checkout", "-b", "main"], { cwd });
    }
  }
  await spawn("git", ["config", "user.email", "x@y.z"], { cwd });
  await spawn("git", ["config", "user.name", "xyz"], { cwd });
  await spawn("git", ["config", "commit.gpgSign", "false"], { cwd });
  await spawn("git", ["config", "tag.gpgSign", "false"], { cwd });
  await spawn("git", ["config", "tag.forceSignAnnotated", "false"], {
    cwd,
  });

  await spawn("git", ["add", "."], { cwd });
  await spawn("git", ["commit", "-m", "initial commit", "--allow-empty"], {
    cwd,
  });

  return cwd;
}
