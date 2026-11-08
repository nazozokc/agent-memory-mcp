import { McpServer } from "@modelcontextprotocol/server";
import { StdioServerTransport } from "@modelcontextprotocol/server/stdio";
import { mkdir } from "node:fs/promises";
import { MemoryGetInputSchema } from "./memory_get/type.ts";
import { MCP_NAME } from "./constant/app.ts";
import { join } from "node:path";
import { ConfigDir } from "./constant/ConfigRead.ts";
import { getFile } from "./memory_get/index.ts";
import { AgentMemorySaveSchema } from "./memory_save/type.ts";
import { writeMemoryFile } from "./memory_save/index.ts";

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
  async ({ id }) => {
    const memory = getFile(id);

    if (!memory) {
      return {
        content: [
          {
            type: "text",
            text: `Not Found ${id}`,
          },
        ],
      };
    }

    return {
      content: [
        {
          type: "text",
          text: "Memory retrieved successfully.",
        },
      ],
      structuredContent: memory,
    };
  },
);

server.registerTool(
  "memory_save",
  {
    description: "Get agent memory",
    inputSchema: AgentMemorySaveSchema,
  },
  async ({ category, tags, agent, title, summary, content }) => {
    const result = await writeMemoryFile({
      category,
      tags,
      agent,
      title,
      summary,
      content,
    });

    if (result === true) {
      return {
        content: [
          {
            type: "text",
            text: "successfully save agent memory",
          },
        ],
        structuredContent: {
          success: true,
        },
      };
    }

    if (result === false) {
      return {
        content: [
          {
            type: "text",
            text: "Failed save agent memory",
          },
        ],
        structuredContent: {
          success: false,
        },
      };
    }
  },
);

export async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}
