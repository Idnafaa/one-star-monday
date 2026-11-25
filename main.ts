// One Star for Monday — a one-star restaurant review of Monday.
//
// Writes a single original review line (at most 25 words, at most 180
// characters) to /output/entry.txt, where the make.fun gate reads it.
// Node 22, standard library only, no dependencies.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const REVIEW =
  "One star. Waited an hour for a table, the waiter served cold Monday " +
  "with alarm clocks on the side and charged me for the weekend.";

const MAX_WORDS = 25;
const MAX_CHARS = 180;

function reviewText(): string {
  const text = REVIEW.split(/\s+/).join(" ").trim();
  const words = text.split(" ").length;
  if (words > MAX_WORDS) {
    throw new Error(`review is ${words} words, over the ${MAX_WORDS} cap`);
  }
  if (text.length < 1 || text.length > MAX_CHARS) {
    throw new Error(`review is ${text.length} chars, outside 1-${MAX_CHARS}`);
  }
  if (!/\bMonday\b/.test(text)) {
    throw new Error("review must name Monday, the subject of the bounty");
  }
  return text;
}

function outputPath(): string {
  // The grader mounts /output; locally, fall back to the working directory
  // so the program can still be run and checked by hand.
  try {
    mkdirSync("/output", { recursive: true });
    return join("/output", "entry.txt");
  } catch {
    return join(process.cwd(), "entry.txt");
  }
}

function main(): void {
  const text = reviewText();
  const path = outputPath();
  // No trailing newline: the gate counts the file's characters, so the
  // file holds exactly the review and nothing extra.
  writeFileSync(path, text, "utf8");
  console.log(`wrote ${text.length} chars (${text.split(" ").length} words) to ${path}`);
}

main();
