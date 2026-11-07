import { ConfigTypeSchema, type ConfigType } from "../type.ts";
import { join } from "node:path";
import { homedir } from "node:os";
import { readFile } from "node:fs\/promises";

const CONFIG_DIR = join(homedir(), ".config", "agent-memory", "config.json");

const ConfigDefault: ConfigType = {
  dir: join(homedir(), ".agent-memory"),
};

export const ConfigDir = async (): Promise<ConfigType["dir"]> => {
  const readConfig = await readFile(CONFIG_DIR, "utf-8");
  const readConfigSchema = ConfigTypeSchema.safeParse(JSON.parse(readConfig));

  if (readConfigSchema.error) {
    return ConfigDefault.dir;
  }

  return readConfigSchema.data.dir;
};
