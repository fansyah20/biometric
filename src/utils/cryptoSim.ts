/**
 * cryptoSim.ts
 * -----------------------------------------------------------------------
 * Demo-only, client-side simulation of a "Zero-Knowledge-Proof-style"
 * commitment hash. This does NOT implement real ZKP or homomorphic
 * cryptography — it exists purely to render a believable
 * `0x7f9a...3b21`-style identifier in the UI for prototyping/presentation
 * purposes. Do not use this for anything that touches real identity data.
 * -----------------------------------------------------------------------
 */

const HEX_CHARS = "0123456789abcdef";

function randomHex(length: number): string {
  let out = "";
  for (let i = 0; i < length; i++) {
    out += HEX_CHARS[Math.floor(Math.random() * HEX_CHARS.length)];
  }
  return out;
}

/** A simple non-cryptographic string hash (FNV-1a) for deterministic previews. */
function fnv1a(input: string): number {
  let hash = 0x811c9dc5;
  for (let i = 0; i < input.length; i++) {
    hash ^= input.charCodeAt(i);
    hash = Math.imul(hash, 0x01000193);
  }
  return hash >>> 0;
}

/**
 * Produces a display-only "civic hash" preview string in the shape
 * `0xAAAA...ZZZZ`, seeded from the given source (e.g. a masked NIK)
 * so the same input renders a stable-looking preview.
 */
export function generateCivicHashPreview(seed: string): string {
  const seeded = fnv1a(seed).toString(16).padStart(8, "0");
  const head = (seeded + randomHex(4)).slice(0, 4);
  const tail = randomHex(4);
  return `0x${head}...${tail}`;
}

export function generateFullHashSimulated(seed: string): string {
  const seeded = fnv1a(seed).toString(16).padStart(8, "0");
  return `0x${seeded}${randomHex(56)}`;
}

/** Masks a 16-digit NIK for display, e.g. 3273010101990001 -> 3273••••••••0001 */
export function maskNik(nik: string): string {
  if (nik.length !== 16) return nik;
  return `${nik.slice(0, 4)}${"•".repeat(8)}${nik.slice(-4)}`;
}
