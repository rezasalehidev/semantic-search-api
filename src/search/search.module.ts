import { Module } from '@nestjs/common';
import { SeedService } from '../seed/seed.service.js';
import { DocumentsController } from './documents.controller.js';
import { SearchController } from './search.controller.js';
import { SearchService } from './search.service.js';
import { VectorStoreService } from './vector-store.service.js';

@Module({
  controllers: [SearchController, DocumentsController],
  providers: [VectorStoreService, SearchService, SeedService],
  exports: [VectorStoreService, SearchService, SeedService],
})
export class SearchModule {}
