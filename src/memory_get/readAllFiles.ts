import { readFile, readdir } from "node:fs/promises";
import { homedir } from "node:os";
import { join } from "node:path";
import { dirRead } from "../constant/ConfigRead";
import { AgentMemorySchema } from "../type";

export const getFile = async (id: string): Promise<void> => {
  const lessonsdir = join(await dirRead(), "lessons");
  const lessons = await readdir();
};

const writeData = async (): Promise<void> => {};
