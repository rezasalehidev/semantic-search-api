# Embeddings & Semantic Search

Demo NestJS API that embeds documents with Groq through the official OpenAI client, stores vectors in memory, and ranks results with cosine similarity.

It is a small repository demo, not a production search stack. Restarting the process clears the store. Seed data loads automatically on boot when `GROQ_API_KEY` is set.

## Stack

- NestJS 12 + pnpm
- OpenAI SDK pointed at `https://api.groq.com/openai/v1`
- Groq embeddings: `nomic-embed-text-v1.5`
- Groq chat: `openai/gpt-oss-20b`
- In-memory vector store + seeded OrbitDesk knowledge base

## Setup

```bash
pnpm install
cp .env.example .env
```

Add a Groq key from [console.groq.com/keys](https://console.groq.com/keys) to `.env`.

```bash
pnpm start:dev
```

The API is at `http://localhost:3000/api`. Boot embeds the 12 OrbitDesk seed docs.

If embeddings fail, try this model id in `.env`:

```bash
GROQ_EMBEDDING_MODEL=nomic-embed-text-v1_5
```

## Try it

```bash
# health + seed count
curl http://localhost:3000/api/health

# list seed documents
curl http://localhost:3000/api/documents

# semantic search (meaning, not exact keywords)
curl -X POST http://localhost:3000/api/search \
  -H 'Content-Type: application/json' \
  -d '{"query":"how do I take vacation days?","limit":3}'

# RAG answer using retrieved snippets
curl -X POST http://localhost:3000/api/ask \
  -H 'Content-Type: application/json' \
  -d '{"question":"What does the Growth plan include?"}'

# reload seed data
curl -X POST http://localhost:3000/api/documents/seed
```

Useful demo queries:

- `how do I take vacation days?` → time-off policy
- `what does growth cost?` → pricing
- `can we use okta?` → SSO
- `is there a phone app?` → mobile apps

`requests.http` has the same calls for the REST client.

## API

| Method | Path | Purpose |
| --- | --- | --- |
| GET | `/api` or `/api/health` | Status, models, document count |
| GET | `/api/documents` | List stored documents |
| GET | `/api/documents/:id` | One document |
| POST | `/api/documents` | Embed and store a document |
| POST | `/api/documents/seed` | Reset and load OrbitDesk seed data |
| DELETE | `/api/documents` | Clear the in-memory store |
| POST | `/api/search` | Semantic search |
| POST | `/api/ask` | Search + Groq answer |

## Scripts

```bash
pnpm start:dev
pnpm test
pnpm test:e2e
pnpm build
```
