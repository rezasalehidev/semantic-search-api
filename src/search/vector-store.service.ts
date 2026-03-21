import { Injectable } from '@nestjs/common';
import { cosineSimilarity } from '../common/cosine.js';
import {
  PublicDocument,
  RankedDocument,
  StoredDocument,
} from './stored-document.js';

@Injectable()
export class VectorStoreService {
  private readonly documents = new Map<string, StoredDocument>();

  upsert(document: StoredDocument): PublicDocument {
    this.documents.set(document.id, document);
    return this.toPublic(document);
  }

  get(id: string): StoredDocument | undefined {
    return this.documents.get(id);
  }

  list(): PublicDocument[] {
    return [...this.documents.values()].map((document) =>
      this.toPublic(document),
    );
  }

  delete(id: string): boolean {
    return this.documents.delete(id);
  }

  clear(): void {
    this.documents.clear();
  }

  size(): number {
    return this.documents.size;
  }

  search(queryEmbedding: number[], limit: number): RankedDocument[] {
    return [...this.documents.values()]
      .map((document) => ({
        ...this.toPublic(document),
        score: Number(
          cosineSimilarity(queryEmbedding, document.embedding).toFixed(4),
        ),
      }))
      .sort((left, right) => right.score - left.score)
      .slice(0, limit);
  }

  private toPublic(document: StoredDocument): PublicDocument {
    return {
      id: document.id,
      title: document.title,
      content: document.content,
      metadata: document.metadata,
    };
  }
}
