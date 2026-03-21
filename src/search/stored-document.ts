export type DocumentMetadata = Record<string, string>;

export interface StoredDocument {
  id: string;
  title: string;
  content: string;
  metadata: DocumentMetadata;
  embedding: number[];
}

export interface PublicDocument {
  id: string;
  title: string;
  content: string;
  metadata: DocumentMetadata;
}

export interface RankedDocument extends PublicDocument {
  score: number;
}
