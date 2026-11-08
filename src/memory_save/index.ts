import { join } from "node:path";
import { writeFile, rename } from "node:fs/promises";
import {
  type AgentMemorySave,
  type AgentMemory,
  AgentMemorySchema,
  AgentMemorySaveSchema,
} from "../Globaltype.ts";
import { ConfigDir } from "../constant/ConfigRead.ts";
import { randomUUIDv7 } from "node:crypto";

export const writeMemoryFile = async ({
  category,
  tags,
  agent,
  title,
  summary,
  content,
}: AgentMemorySave): Promise<boolean> => {
  const data = {
    category,
    tags,
    agent,
    title,
    summary,
    content,
  };
  const SaveSchema = AgentMemorySaveSchema.safeParse(data);

  if (!SaveSchema.success) {
    throw new Error();
  }

  const savedata: AgentMemory = {
    id: randomUUIDv7(),
    created: new Date().toISOString(),
    ...SaveSchema.data,
  };

  const SchemaCheck = AgentMemorySchema.safeParse(savedata);

  if (!SchemaCheck.success) {
    throw new Error();
  }

  const categories: AgentMemorySave["category"] = SchemaCheck.data.category;

  const directoryTemp = join(
    await ConfigDir(),
    categories,
    `${SchemaCheck.data.id}.json.tmp`,
  );

  const directory = join(
    await ConfigDir(),
    categories,
    `${SchemaCheck.data.id}.json`,
  );

  try {
    const stringify = JSON.stringify(SchemaCheck.data, null, 2);
    await writeFile(directoryTemp, stringify, "utf-8");
    await rename(directoryTemp, directory);
    return true;
  } catch (error) {
    return false;
  }
};
