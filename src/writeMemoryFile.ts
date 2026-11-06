import { join } from "node:path";
import { writeFile } from "node:fs/promises";
import type { AgentMemorySave, AgentMemory } from "./type.ts";
import { dirRead } from "./constant/ConfigRead.ts";
import { randomUUIDv7 } from "node:crypto";

export const writeMemoryFile = async (data: AgentMemorySave): Promise<void> => {
  const category: AgentMemory["category"] = data.category;
  const directory = join(await dirRead(), category);

  const SaveData: AgentMemory = {
    id: randomUUIDv7(),
    created: new Date().toISOString(),
    ...data,
  };

  const stringify = JSON.stringify(data);
};
