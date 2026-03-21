import { Body, Controller, Delete, Post } from '@nestjs/common';
import { CreateDocumentDto } from './dto/create-document.dto.js';
import { SearchService } from './search.service.js';
import { SeedService } from '../seed/seed.service.js';

@Controller('documents')
export class DocumentsController {
  constructor(
    private readonly searchService: SearchService,
    private readonly seedService: SeedService,
  ) {}

  @Post()
  create(@Body() dto: CreateDocumentDto) {
    return this.searchService.addDocument(dto);
  }

  @Post('seed')
  seed() {
    return this.seedService.seed(true);
  }

  @Delete()
  clear() {
    return this.searchService.clear();
  }
}
