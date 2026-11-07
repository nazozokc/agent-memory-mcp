import { McpServer } from "@modelcontextprotocol/server";
import { StdioServerTransport } from "@modelcontextprotocol/server/stdio";
import { mkdir } from "node:fs/promises";
import { MemoryGetInputSchema } from "./memory_get/type.ts";
import { MCP_NAME } from "./constant/app.ts";
import { join } from "node:path";
import { ConfigDir } from "./constant/ConfigRead.ts";

const lessons = join(await ConfigDir(), "lessons");
const patterns = join(await ConfigDir(), "patterns");
const context = join(await ConfigDir(), "context");
const commands = join(await ConfigDir(), "commands");
const preferences = join(await ConfigDir(), "preferences");

await mkdir(lessons, { recursive: true });
await mkdir(patterns, { recursive: true });
await mkdir(context, { recursive: true });
await mkdir(commands, { recursive: true });
await mkdir(preferences, { recursive: true });

const server = new McpServer({ name: MCP_NAME, version: "0.0.1" });

server.registerTool(
  "memory_get",
  {
    description: "Get agent memory",
    inputSchema: MemoryGetInputSchema,
  },
  async ({ id }) => ({
    content: [],
  }),
);

export async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}
