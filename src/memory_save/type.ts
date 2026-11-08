import { z } from "zod";
import { AgentMemorySchema } from "../Globaltype.ts";

export const AgentMemorySaveSchema = AgentMemorySchema.omit({
  id: true,
  created: true,
});

export type AgentMemorySave = z.infer<typeof AgentMemorySaveSchema>;
