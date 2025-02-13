import { Config } from "@remotion/cli/config";

Config.setEntryPoint("./index.ts")
Config.setPublicDir("./static");
Config.setMuted(true);
Config.setOverwriteOutput(true);
