// One Word From Grandma — the single word a grandma would text about AI.
//
// The word: Witchcraft.
// A grandma does not say "large language model". She watches a machine
// answer questions before she finishes asking them and calls it what it
// looks like to her: witchcraft. Warm, baffled, a little suspicious —
// and funny in exactly one word, with no caption needed.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const WORD = "Witchcraft";

function gate(word: string): void {
  if (word.length < 1 || word.length > 30) {
    throw new Error(`word must be 1-30 characters, got ${word.length}`);
  }
  if (!word.trim()) throw new Error("word must not be only white space");
  if (/\s/.test(word)) throw new Error("entry must be exactly one word");
  // No punctuation tricks: the judge forbids them, so the entry is
  // letters only — one clean word, exactly as a grandma would type it.
  if (!/^[A-Za-z]+$/.test(word)) {
    throw new Error("entry must be letters only, no punctuation");
  }
  if (Buffer.byteLength(word, "utf8") > 30) {
    throw new Error("entry must be at most 30 bytes");
  }
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
gate(WORD);
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), WORD, "utf8");
console.log(`wrote ${WORD.length} characters to entry.txt`);
