// Cat meme website – AssemblyScript WebAssembly module.
// Stores captions and exposes helpers used by the browser frontend.

const captions: StaticArray<string> = [
  "I can haz cheezburger?",
  "Monday? I don't think so.",
  "You were saying something?",
  "On the internet, nobody knows you're a cat.",
  "Knock knock. Who's there? Me. Pushing things off your desk.",
  "I'm not lazy. I'm on energy-saving mode.",
  "My alarm clock is a cat. Works great. No snooze button though.",
  "I'm working from home. The cat is supervising.",
  "Humans think they own us. Adorable.",
  "404: Motivation not found.",
  "I was going to do something, but then I sat down.",
  "Purring intensifies.",
  "Did you say treat?",
  "Zoom meeting? I got this.",
  "Not today, Monday.",
  "My cat judged me. I felt it.",
  "Sleep is my superpower.",
  "The floor is a valid nap location.",
  "Why stand when you can loaf?",
  "Cat law: if I fits, I sits.",
];

/** Returns the total number of available meme captions. */
export function getMemeCount(): i32 {
  return captions.length;
}

/** Returns the caption at the given index (clamped to valid range). */
export function getMemeCaption(index: i32): string {
  const count = captions.length;
  if (count === 0) return "";
  const i = ((index % count) + count) % count;
  return captions[i];
}

/**
 * Returns a pseudorandom caption index derived from the provided seed.
 * Uses a 32-bit LCG so callers can provide any integer as entropy.
 */
export function getRandomIndex(seed: i32): i32 {
  const a: i32 = 1664525;
  const c: i32 = 1013904223;
  const next: i32 = a * seed + c;
  const count = captions.length;
  const mod = next % count;
  return mod < 0 ? mod + count : mod;
}
