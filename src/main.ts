import { McpServer } from "@modelcontextprotocol/server";
import { StdioServerTransport } from "@modelcontextprotocol/server/stdio";
import { MemoryGetInputSchema } from "./memory_get/type.ts";
import { MCP_NAME } from "./constant/app.ts";

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
