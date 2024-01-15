import dotenv from 'dotenv';
dotenv.config();
import { Unsplash } from "./unsplash.js";

const unsplash_key = process.env.UNSPLASH_KEY;
if (!unsplash_key) {
  console.log("Unsplash key is missing or invalid");
  process.exit(1);
}

const unsplash = new Unsplash(unsplash_key);
const count = 10;
const filePath = process.env.FILE_PATH;

await unsplash.getRandom(count, filePath, '');

