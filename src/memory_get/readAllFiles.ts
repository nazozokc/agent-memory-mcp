import { readFile } from "node:fs/promises";
import { homedir } from "node:os";
import { join } from "node:path";
import { dirRead } from "../constant/ConfigRead";
import { AgentMemorySchema } from "../type";

export const getFile = async (id: string): Promise<void> => {
  const dir = join(await dirRead(), category, `${id}.json`);
  const readJSON = await readFile(dir, "utf-8");
  const parseSchema = AgentMemorySchema.safeParse(JSON.parse(readJSON));

  if (!parseSchema.success) {
  }
};
