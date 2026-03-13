# humano-sdk

Official JavaScript/Node.js SDK for the [HUMANO](https://humano4.vercel.app) human authorship certification platform.

## Telepítés
```bash
npm install humano-sdk
```

## Használat
```javascript
const { HumanoClient } = require('humano-sdk');

const client = new HumanoClient('HMN_KEY_xxxxx');

// Szöveg hitelesítése
const result = await client.certify({
  title:      'Cikkem címe',
  content:    'A teljes szöveg...',
  authorId:   'uuid-a-supabase-bol',
  authorName: 'Kovács Péter'
});
console.log(result.doc_id);    // DOC-XXXXXX-YYYY
console.log(result.verify_url); // https://humano4.vercel.app?verify=DOC-...

// Dokumentum ellenőrzése
const doc = await client.verify('DOC-XXXXXX-YYYY');
console.log(doc.blockchain); // 'confirmed' | 'pending' | 'none'

// Szöveg keresése hash alapján
const found = await client.findByText('Az eredeti szöveg...');

// Registry keresés
const results = await client.search('Kovács Péter');
```

## API kulcs igénylés

Látogass el a [HUMANO Fejlesztőknek](https://humano4.vercel.app) oldalra.

## Licenc

MIT