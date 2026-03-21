import { Injectable, NotFoundException } from '@nestjs/common';
import { GroqService } from '../groq/groq.service.js';
import { CreateDocumentDto } from './dto/create-document.dto.js';
import { PublicDocument, RankedDocument } from './stored-document.js';
import { VectorStoreService } from './vector-store.service.js';

@Injectable()
export class SearchService {
  constructor(
    private readonly groq: GroqService,
    private readonly store: VectorStoreService,
  ) {}

  listDocuments(): PublicDocument[] {
    return this.store.list();
  }

  getDocument(id: string): PublicDocument {
    const document = this.store.get(id);
    if (!document) {
      throw new NotFoundException(`Document ${id} was not found`);
    }

    return {
      id: document.id,
      title: document.title,
      content: document.content,
      metadata: document.metadata,
    };
  }

  async addDocument(dto: CreateDocumentDto): Promise<PublicDocument> {
    const [embedding] = await this.groq.embed([
      this.toEmbedText(dto.title, dto.content),
    ]);

    return this.store.upsert({
      id: crypto.randomUUID(),
      title: dto.title,
      content: dto.content,
      metadata: dto.metadata ?? {},
      embedding,
    });
  }

  async addMany(
    items: Array<{
      id?: string;
      title: string;
      content: string;
      metadata?: Record<string, string>;
    }>,
  ): Promise<PublicDocument[]> {
    if (items.length === 0) {
      return [];
    }

    const embeddings = await this.groq.embed(
      items.map((item) => this.toEmbedText(item.title, item.content)),
    );

    return items.map((item, index) =>
      this.store.upsert({
        id: item.id ?? crypto.randomUUID(),
        title: item.title,
        content: item.content,
        metadata: item.metadata ?? {},
        embedding: embeddings[index],
      }),
    );
  }

  async search(query: string, limit = 5): Promise<RankedDocument[]> {
    const [embedding] = await this.groq.embed([query]);
    return this.store.search(embedding, limit);
  }

  async ask(question: string, limit = 4) {
    const matches = await this.search(question, limit);
    const context = matches
      .map((match, index) => `[${index + 1}] ${match.title}\n${match.content}`)
      .join('\n\n');

    const answer = await this.groq.chat(
      'You answer using only the supplied OrbitDesk knowledge snippets. If the snippets do not contain the answer, say you do not know. Keep the reply short.',
      `Question: ${question}\n\nSnippets:\n${context || 'None'}`,
    );

    return {
      question,
      answer,
      sources: matches,
    };
  }

  clear(): { deleted: number } {
    const deleted = this.store.size();
    this.store.clear();
    return { deleted };
  }

  private toEmbedText(title: string, content: string): string {
    return `${title}\n${content}`;
  }
}
