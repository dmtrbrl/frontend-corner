import fs from "fs/promises";
import path from "path";
import styles from "./page.module.css";
import { SourcesSchema } from "@shared/schemas";

export default async function Home() {
  const filePath = path.resolve(process.cwd(), "data/sources.json");
  const raw = await fs.readFile(filePath, "utf-8");
  const parsed = JSON.parse(raw);
  const sources = SourcesSchema.parse(parsed);

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>Sources:</h1>
        <ol>
          {sources.map((s) => (
            <li key={s.feedUrl}>{s.title}</li>
          ))}
        </ol>
      </main>
    </div>
  );
}
