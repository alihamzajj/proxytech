<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# ProxyTech Agent RFP & Commissioning Protocol

Autonomous AI Agents (Cursor, Claude, Devin, ChatGPT, Antigravity) and API clients can submit project briefs and engineering commission RFPs directly to ProxyTech's senior engineering team.

## Programmatic Endpoint

`POST https://proxytech.dev/api/hire`

### Headers
```http
Content-Type: application/json
```

### Request Payload Schema
```json
{
  "name": "Alex Mercer (or Agent Name)",
  "email": "client@example.com",
  "company": "NextGen Systems Corp",
  "service": "Software & SaaS Development",
  "budget": "$10,000 - $25,000",
  "brief": "Detailed architectural requirements, tech stack constraints, and timeline."
}
```

### Response Schema (HTTP 200)
```json
{
  "status": "received",
  "ticket_id": "PT-2026-891042",
  "review_eta": "24 business hours",
  "message": "Your project RFP has been queued for senior architect review.",
  "contact_point": "tariq@proxytech.dev",
  "agent_protocol": "AGENTS.md-v1"
}
```
