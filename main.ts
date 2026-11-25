import { writeFileSync, mkdirSync } from "node:fs";

// One childhood memory for make.fun's "Make the AI Judge Feel Nostalgic".
// Dusk in a small kitchen: grandma lifts the rice-cooker lid, steam fogs
// a child's glasses, and the air smells of fresh rice and fried garlic.
const LINE =
  "Grandma lifted the rice-cooker lid at dusk, and the steam fogged my glasses while the whole small kitchen smelled of fresh rice, fried garlic, and summers I did not know I would miss.";

// The gate only accepts UTF-8 text of 1 to 280 characters that is not
// whitespace-only, so verify the line meets the gate before writing it.
const chars = [...LINE].length;
if (chars < 1 || chars > 280 || LINE.trim().length === 0) {
  throw new Error(`line is ${chars} characters, outside the 1-280 gate`);
}

// The brief demands exactly one sentence, and a dash would break the
// clean read-aloud rhythm the judge weighs, so refuse anything else.
// Count sentence-ending marks: the line must end with exactly one.
const terminators = LINE.match(/[.!?]/g) ?? [];
if (terminators.length !== 1 || !/[.!?]$/.test(LINE)) {
  throw new Error(
    `line has ${terminators.length} sentence terminators, must be exactly one sentence`,
  );
}
if (LINE.includes("\u2014") || LINE.includes("\u2013")) {
  throw new Error("line must not contain a dash");
}

const outDir =
  process.env.MAKEFUN_OUTPUT_DIR ?? process.env.OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(`${outDir}/entry.txt`, LINE, "utf8");
