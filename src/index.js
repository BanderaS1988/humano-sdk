const EDGE_BASE = 'https://vidlijysdhbfvvytuzcg.supabase.co/functions/v1';

async function sha256(text) {
  const encoder = new TextEncoder();
  const data = encoder.encode(text);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(hashBuffer))
    .map(b => b.toString(16).padStart(2, '0')).join('');
}

class HumanoClient {
  constructor(apiKey) {
    if (!apiKey || !apiKey.startsWith('HMN_KEY_')) {
      throw new Error('Érvénytelen API kulcs. Formátum: HMN_KEY_xxxxx');
    }
    this.apiKey = apiKey;
    this.headers = {
      'Content-Type': 'application/json',
      'x-api-key': apiKey
    };
  }

  async certify({ title, content, authorId, authorName }) {
    if (!title)   throw new Error('title kötelező');
    if (!content) throw new Error('content kötelező');

    const resp = await fetch(`${EDGE_BASE}/certify`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({ title, content, author_id: authorId, author_name: authorName })
    });
    const data = await resp.json();
    if (!resp.ok) throw new Error(data.error || 'Hitelesítési hiba');
    return data;
  }

  async verify(docId) {
    if (!docId) throw new Error('docId kötelező');
    const resp = await fetch(`${EDGE_BASE}/verify`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({ doc_id: docId })
    });
    const data = await resp.json();
    if (!resp.ok) return null;
    return data;
  }

  async findByText(text) {
    if (!text) throw new Error('text kötelező');
    const hash = await sha256(text);
    const resp = await fetch(`${EDGE_BASE}/verify`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({ hash })
    });
    const data = await resp.json();
    if (!resp.ok) return null;
    return data;
  }

  async search(query, limit = 10) {
    if (!query) throw new Error('query kötelező');
    const resp = await fetch(`${EDGE_BASE}/quick-handler`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({ action: 'search', query, limit })
    });
    const data = await resp.json();
    if (!resp.ok) return [];
    return data;
  }
}

module.exports = { HumanoClient };