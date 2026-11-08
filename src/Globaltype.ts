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
  created: z.iso.datetime(),
  agent: z.string(),
  title: z.string(),
  summary: z.string(),
  content: z.string(),
});

export type AgentMemory = z.infer<typeof AgentMemorySchema>;

export type Category =
  "lessons" | "patterns" | "context" | "commands" | "preferences";
