import styles from "./page.module.css";
import { getSources } from "@shared/services";

export default async function Home() {
  const sources = await getSources();

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>Sources:</h1>
        <ol>
          {sources.map(({ title }) => (
            <li key={title}>{title}</li>
          ))}
        </ol>
      </main>
    </div>
  );
}
