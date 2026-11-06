import { McpServer } from "@modelcontextprotocol/server";
import { StdioServerTransport } from "@modelcontextprotocol/server/stdio";
import { MemoryGetInputSchema, MemoryGetInputSchemaSchema } from "./type.ts";

const server = new McpServer({ name: "agent-memory-mcp", version: "0.0.1" });

server.registerTool(
  "memory_get",
  {
    description: "Get agent memory",
    inputSchema: MemoryGetInputSchema,
  },
  async ({ id }) => ({
    content: [{ type: "text", text: id }],
  }),
);

server.registerTool(
  "memory_list",
  {
    description: "Get agent memory",
    inputSchema: ,
  },
  async ({ id }) => ({
    content: [{ type: "text", text: id }],
  }),
);

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main();
