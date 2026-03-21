import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AskDto } from './dto/ask.dto.js';
import { SearchDto } from './dto/search.dto.js';
import { SearchService } from './search.service.js';

@Controller()
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Post('search')
  search(@Body() dto: SearchDto) {
    return this.searchService.search(dto.query, dto.limit);
  }

  @Post('ask')
  ask(@Body() dto: AskDto) {
    return this.searchService.ask(dto.question, dto.limit);
  }

  @Get('documents')
  list() {
    return this.searchService.listDocuments();
  }

  @Get('documents/:id')
  getOne(@Param('id') id: string) {
    return this.searchService.getDocument(id);
  }
}
