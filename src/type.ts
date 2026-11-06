import { z } from "zod";

export const AgentMemorySchema = z.object({
  id: z.string(),
  category: z.enum([
    "lessons",
    "patterns",
    "context",
    "commands",
    "preferences",
  ]),
  tags: z.array(z.string()),
  created: z.string(),
  agent: z.string(),
  title: z.string(),
  summary: z.string(),
  content: z.string(),
});

export type AgentMemory = z.infer<typeof AgentMemorySchema>;

export const AgentMemorySaveSchema = AgentMemorySchema.omit({
  id: true,
  created: true,
});

export type AgentMemorySave = z.infer<typeof AgentMemorySaveSchema>;

export type Category =
  "lessons" | "patterns" | "context" | "commands" | "preferences";

export const ConfigTypeSchema = z.object({
  dir: z.string(),
});

export type ConfigType = z.infer<typeof ConfigTypeSchema>;
