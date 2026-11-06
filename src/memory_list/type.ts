import { z } from "zod";

export const MemorySearchSchema = z.object({
  query: z.string(),
  category: z.string(),
  tags: z.array(z.string()),
  limit: z.number(),
});
