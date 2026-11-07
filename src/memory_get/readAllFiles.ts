import { readFile, readdir } from "node:fs/promises";
import { homedir } from "node:os";
import { join } from "node:path";
import { ConfigDir } from "../constant/ConfigRead.ts";
import { AgentMemorySchema, type AgentMemory } from "../type";

export const getFile = async (id: string): Promise<void> => {
  const readMemoryDir = join(await ConfigDir());
  const category: AgentMemory["category"][] = [
    "lessons",
    "patterns",
    "context",
    "commands",
    "preferences",
  ];
};

const writeData = async (): Promise<void> => {};
