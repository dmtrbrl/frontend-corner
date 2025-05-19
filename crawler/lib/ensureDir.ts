import { access, mkdir } from "fs/promises";
import { constants } from "fs";

export async function ensureDir(dir: string): Promise<void> {
  try {
    await access(dir, constants.F_OK);
  } catch {
    await mkdir(dir, { recursive: true });
  }
}
