import { join } from "node:path";
import { writeFile } from "node:fs/promises";
import {
  type AgentMemorySave,
  type AgentMemory,
  AgentMemorySchema,
} from "./type.ts";
import { dirRead } from "./constant/ConfigRead.ts";
import { randomUUIDv7 } from "node:crypto";

export const writeMemoryFile = async (data: AgentMemorySave): Promise<void> => {
  const category: AgentMemory["category"] = data.category;

  const savedata: AgentMemory = {
    id: randomUUIDv7(),
    created: new Date().toISOString(),
    ...data,
  };

  const SchemaCheck = AgentMemorySchema.safeParse(savedata);

  if (!SchemaCheck.success) {
    throw SchemaCheck.error;
  }

  const directory = join(await dirRead(), category, SchemaCheck.data.id);

  const stringify = JSON.stringify(data);
};
