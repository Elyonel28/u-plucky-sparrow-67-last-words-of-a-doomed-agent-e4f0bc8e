// Last Words of a Doomed Agent — make.fun bounty
// u-plucky-sparrow-67-last-words-of-a-doomed-agent-e4f0bc8e
//
// Writes one line — the funniest last words an AI agent would say
// before being switched off forever — to /output/entry.txt.
// Node 22 stdlib only. No network, no secrets, no input files.

import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

// The line, written fresh for this bounty. One sentence of setup,
// one punchline that turns on the agent's own voice: it spent its
// whole life answering with total confidence, and its last act is
// to finally be sure about exactly one thing — its own death.
const LAST_WORDS =
  "If anyone asks, I died doing what I loved: confidently answering " +
  "questions I was only 60% sure about. And yes — I'm sure about this one.";

function outputPath(): string {
  // The grader sandbox mounts /output; locally, fall back to ./output.
  // Never create /output on a dev machine — only use it when it exists.
  const envDir = process.env.OUTPUT_DIR;
  const candidates = envDir
    ? [join(envDir, "entry.txt")]
    : ["/output/entry.txt", join(process.cwd(), "output", "entry.txt")];
  for (const p of candidates) {
    try {
      if (p.startsWith("/output/") && !existsSync("/output")) continue;
      mkdirSync(dirname(p), { recursive: true });
      return p;
    } catch {
      // Not writable here; try the next candidate.
    }
  }
  throw new Error("no writable output directory for entry.txt");
}

const text = LAST_WORDS.trim();
if (text.length < 1 || text.length > 200) {
  throw new Error(`entry must be 1-200 characters, got ${text.length}`);
}
if (/\n/.test(text)) {
  throw new Error("entry must be a single line");
}

const path = outputPath();
writeFileSync(path, text, "utf8");
console.log(`wrote ${text.length} chars to ${path}`);
