export interface CertifyOptions {
  title: string;
  content: string;
  authorId: string;
  authorName?: string;
}

export interface CertifyResult {
  doc_id: string;
  hash: string;
  ots_pending: boolean;
  created_at: string;
  verify_url: string;
}

export interface Document {
  doc_id: string;
  title: string;
  author_name: string;
  hash: string;
  created_at: string;
  ots_receipt: string | null;
  ots_pending: boolean;
  certified: boolean;
  blockchain: 'confirmed' | 'pending' | 'none';
}

export class HumanoClient {
  constructor(apiKey: string);
  certify(opts: CertifyOptions): Promise<CertifyResult>;
  verify(docId: string): Promise<Document | null>;
  findByText(text: string): Promise<Document | null>;
  search(query: string, limit?: number): Promise<Document[]>;
}
