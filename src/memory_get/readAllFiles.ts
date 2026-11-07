import { readdir, stat } from "node:fs/promises";
import { join } from "node:path";
import { ConfigDir } from "../constant/ConfigRead.ts";
import { type AgentMemory } from "../type";

export const getFile = async (id: string): Promise<void> => {
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
    if (isCategory(memory)) continue;

    const dir = join(await ConfigDir(), memory);
    const readDirectory = await readdir(dir, "utf-8");
    const somes = readDirectory.some((file) => file === `${id}.json`);

    if (!somes) continue;
  }
};
