import Link from "next/link";
import styles from "./AppFooter.module.css";

export default function AppFooter() {
  return (
    <footer className={styles.footer}>
      <a href="#">↗️ Share</a>
      <ul>
        <li>
          <Link href="/archive">📋 Archive</Link>
        </li>
        <li>
          <Link href="/about">ℹ️ About</Link>
        </li>
        <li>
          <a href="https://github.com/dmtrbrl/frontend-corner" target="__blank">
            👾 GitHub
          </a>
        </li>
      </ul>
    </footer>
  );
}
