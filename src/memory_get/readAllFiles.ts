import { readFile, readdir } from "node:fs/promises";
import { homedir } from "node:os";
import { join } from "node:path";
import { ConfigDir } from "../constant/ConfigRead.ts";
import { AgentMemorySchema } from "../type";

export const getFile = async (id: string): Promise<void> => {
  const readMemoryDir = join(await ConfigDir());
  const list = [];

  for (const memory of readMemoryDir) {
  }
};

const writeData = async (): Promise<void> => {};
