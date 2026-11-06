import type { AgentMemorySave, AgentMemory } from "./type.ts";
import { writeFile } from "node:fs/promises";

export const writeMemoryFile = async (data: AgentMemorySave): Promise<void> => {
  const category: AgentMemory["category"] = data.category;

  const stringify = JSON.stringify(data);
  await writeFile();
};
