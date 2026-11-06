import { z } from "zod";

export const MemoryGetInputSchema = z.object({
  id: z.string(),
});
