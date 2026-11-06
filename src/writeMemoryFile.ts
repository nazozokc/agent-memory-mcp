import { join } from "node:path";
import { writeFile, rename } from "node:fs/promises";
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

  const directoryTemp = join(
    await dirRead(),
    category,
    `${SchemaCheck.data.id}.json.tmp`,
  );

  const directory = join(
    await dirRead(),
    category,
    `${SchemaCheck.data.id}.json`,
  );

  try {
    const stringify = JSON.stringify(SchemaCheck.data);
    await writeFile(directoryTemp, stringify, "utf-8");
    await rename(directoryTemp, directory);
  } catch (error) {
    throw new Error();
  }
};
