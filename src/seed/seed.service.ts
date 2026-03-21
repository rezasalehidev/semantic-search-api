import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GroqService } from '../groq/groq.service.js';
import { SearchService } from '../search/search.service.js';
import { VectorStoreService } from '../search/vector-store.service.js';
import { ORBITDESK_SEED } from './orbitdesk.seed.js';

@Injectable()
export class SeedService implements OnModuleInit {
  private readonly logger = new Logger(SeedService.name);

  constructor(
    private readonly config: ConfigService,
    private readonly groq: GroqService,
    private readonly search: SearchService,
    private readonly store: VectorStoreService,
  ) {}

  async onModuleInit() {
    const autoSeed = this.config.get<string>('AUTO_SEED') !== 'false';
    if (!autoSeed) {
      this.logger.log('AUTO_SEED=false, skipping demo seed');
      return;
    }

    if (!this.groq.isConfigured()) {
      this.logger.warn(
        'GROQ_API_KEY is missing. Seed data will load after you add a key and POST /api/documents/seed',
      );
      return;
    }

    await this.seed(false);
  }

  async seed(force: boolean) {
    if (!force && this.store.size() > 0) {
      return {
        seeded: false,
        reason: 'store already has documents',
        count: this.store.size(),
      };
    }

    this.store.clear();
    const documents = await this.search.addMany(ORBITDESK_SEED);
    this.logger.log(`Seeded ${documents.length} OrbitDesk documents`);

    return {
      seeded: true,
      count: documents.length,
      documents,
    };
  }
}
