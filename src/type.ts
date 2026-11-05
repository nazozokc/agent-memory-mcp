import { z } from "zod";

export const AgentMemorySchema = z.object({
  id: z.string(),
  category: z.string(),
  tags: z.array(z.string()),
  created: z.string(),
  agent: z.string(),
  title: z.string(),
  summary: z.string(),
  content: z.string(),
});

export type AgentMemory = z.infer<typeof AgentMemorySchema>;

export const InputSchema = z.object({
  query: z.string(),
  category: z.string(),
  tags: z.array(z.string()),
  limit: z.number(),
});

export type InputSchema = z.infer<typeof InputSchema>;

export type Category =
  "lessons" | "patterns" | "context" | "commands" | "preferences";
