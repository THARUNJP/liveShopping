import { CHARS } from "./constant";

function randomPart(length: number): string {
  let result = "";
  for (let i = 0; i < length; i++) {
    result += CHARS.charAt(Math.floor(Math.random() * CHARS.length));
  }
  return result;
}

export function generateSessionCode(): string {
  return `${randomPart(3)}-${randomPart(4)}-${randomPart(3)}`;
}