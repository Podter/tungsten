import { customAlphabet } from "nanoid";

const ALPHABET = "abcdefghijklmnopqrstuvwxyz0123456789";

export const nanoid = customAlphabet(ALPHABET, 16);
