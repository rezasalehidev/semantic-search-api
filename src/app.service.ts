import { Injectable } from '@nestjs/common';
import { GroqService } from './groq/groq.service.js';
import { VectorStoreService } from './search/vector-store.service.js';

@Injectable()
export class AppService {
  constructor(
    private readonly groq: GroqService,
    private readonly store: VectorStoreService,
  ) {}

  getHealth() {
    return {
      name: 'embeddings-semantic-search',
      status: 'ok',
      groqConfigured: this.groq.isConfigured(),
      documents: this.store.size(),
      models: {
        embeddings: this.groq.embeddingModel,
        chat: this.groq.chatModel,
      },
      endpoints: {
        health: 'GET /api/health',
        search: 'POST /api/search',
        ask: 'POST /api/ask',
        documents: 'GET /api/documents',
        seed: 'POST /api/documents/seed',
      },
    };
  }
}
