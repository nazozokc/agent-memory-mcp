import { readdir, readFile, stat } from "node:fs/promises";
import { join } from "node:path";
import { ConfigDir } from "../constant/ConfigRead.ts";
import { AgentMemorySchema, type AgentMemory } from "../type.ts";

export const getFile = async (id: string): Promise<AgentMemory | undefined> => {
  const categories: AgentMemory["category"][] = [
    "lessons",
    "patterns",
    "context",
    "commands",
    "preferences",
  ];
  const readMemoryDir = join(await ConfigDir());
  const readMemory = await readdir(readMemoryDir, "utf-8");
  const isCategory = (value: string): value is AgentMemory["category"] => {
    return categories.some((category) => category === value);
  };

  for (const memory of readMemory) {
    const accessFile = await stat(join(await ConfigDir(), memory));
    if (!accessFile.isDirectory()) continue;
    if (!isCategory(memory)) continue;

    const dir = join(await ConfigDir(), memory);
    const readDirectory = await readdir(dir, "utf-8");
    if (!readDirectory.includes(`${id}.json`)) continue;
    const joinFile = join(await ConfigDir(), "memory", `${id}.json`);
    const readJSON = await readFile(joinFile, "utf-8");

    const SafeSchema = AgentMemorySchema.safeParse(JSON.parse(readJSON));
    if (!SafeSchema.success) continue;

    return SafeSchema.data;
  }
};
