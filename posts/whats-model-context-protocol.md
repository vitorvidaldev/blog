# What is Model Context Protocol (MCP)

*Date: 2025-06-24*

MCP is an open-source standard to connect LLMs to external tools, such as databases or APIs. It's built on JSON-RPC 2.0, supports stateful sessions, and centers around three main roles: Host, Client, and Server.

### Concepts

#### MCP Host
- The application the user interacts with (IDE, ChatGPT, etc.)
- Creates and manages multiple MCP Clients
- Handles security, user consent, authorization, and context aggregation before feeding information into the LLM

#### MCP Client
- A bridge inside the Host; each Client connects 1:1 to an MCP Server
- Manages session state, capacity negotiation, request/notification routing, and subscriptions
- Uses JSON-RPC over transports like stdio or HTTP+SSE

#### MCP Server
- A focused service exposing resources, prompts, and tools to the Client
- Can wrap databases, APIs, filesystems, GitHub, Slack, etc.
- Advertises its capabilities, handles requests, and maintains isolation—servers only see relevant context

### Workflow
1. Host spins up Client A and Client B
2. Each Client initializes its connection with Server A and B
3. Host sends a prompt to the LLM
4. LLM decides to use a tool—Client routes the request to Server
5. Server executes the tool/resource fetch and returns data via Client
6. Host collects responses, merges them, and feeds them back to the LLM

### Capabilities

Capabilities describe the features supported by Clients and Servers. The Host only uses features that are supported by both.

There are four primary capability categories that MCP Servers can declare:
1. tools – Callable functions or actions a model can trigger
2. resources – Read-only structured data (e.g., files, database queries)
3. prompts – Reusable prompt templates or workflows
4. sampling – Server-initiated requests for the model to perform further reasoning or recursive operations

Capability names only describe the "shape" of the interaction; they do not define the actual service implementation.

#### Example MCP Server Capability Response

```json
{
  "capabilities": {
    "tools": true
  },
  "tools": [
    {
      "name": "getShowtimes",
      "description": "Get movie showtimes for a given cinema and date",
      "parameters": {
        "type": "object",
        "properties": {
          "cinemaId": { "type": "string" },
          "date": { "type": "string", "format": "date" }
        },
        "required": ["cinemaId", "date"]
      }
    },
    {
      "name": "bookTicket",
      "description": "Book a movie ticket for a user",
      "parameters": {
        "type": "object",
        "properties": {
          "userId": { "type": "string" },
          "showtimeId": { "type": "string" }
        },
        "required": ["userId", "showtimeId"]
      }
    }
  ]
}
```

---

*Tags: AI, MCP, Agents*