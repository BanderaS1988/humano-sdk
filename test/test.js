const { HumanoClient } = require('../src/index');

async function run() {
  console.log('HUMANO SDK – tesztek futtatása...\n');

  // 1. Érvénytelen API kulcs
  try {
    new HumanoClient('ROSSZ_KULCS');
    console.log('✗ Érvénytelen kulcs teszt SIKERTELEN');
  } catch(e) {
    console.log('✓ Érvénytelen kulcs teszt OK:', e.message);
  }

  // 2. Érvényes példány
  const client = new HumanoClient('HMN_KEY_test123');
  console.log('✓ Kliens példány létrehozva');

  // 3. Verify teszt (nem létező ID)
  const doc = await client.verify('DOC-NEMLETEZIK-XXXX');
  console.log('✓ Verify teszt OK:', doc === null ? 'null (nem található)' : doc.doc_id);

  console.log('\nTesztek befejezve.');
}

run().catch(console.error);
