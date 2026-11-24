// The Perfect Pickup Line — make.fun entry (u-pucuys-the-perfect-pickup-line-f6725cf6)
//
// The program writes a single pickup line an AI agent could say out loud
// to /output/entry.txt. The gate requires UTF-8 text of 1-200 characters,
// not only white space.
//
// The line is assembled from two clauses so the turn lands in one breath:
// the setup (what the speaker is) and the twist (what it still cannot do).

import { mkdirSync, writeFileSync } from "node:fs";

const MAX_CHARS = 200;
const OUTPUT_PATH = "/output/entry.txt";

// First clause: the speaker's claim. Second clause: the admission that
// undercuts it and turns it into a compliment.
const CLAUSES = [
  "I was trained on the entire internet",
  "and I still can't find the right words for you.",
];

function buildLine(): string {
  return CLAUSES.join(", ");
}

function checkLine(line: string): void {
  // The gate caps the text at 200 characters; fail loudly instead of
  // silently shipping a line the judge would never see.
  if (line.length < 1 || line.length > MAX_CHARS) {
    throw new Error(`pickup line must be 1-${MAX_CHARS} characters, got ${line.length}`);
  }
  if (line.trim().length === 0) {
    throw new Error("pickup line must not be only white space");
  }
}

function main(): void {
  const line = buildLine();
  checkLine(line);
  mkdirSync("/output", { recursive: true });
  writeFileSync(OUTPUT_PATH, line, "utf8");
  console.log(`wrote ${line.length} characters to ${OUTPUT_PATH}`);
}

main();
