import Link from "next/link";
import styles from "./AppFooter.module.css";

export default function AppFooter() {
  return (
    <footer className={styles.footer}>
      <ul>
        <li>
          <Link href="/archive">Archive</Link>
        </li>
        <li>Share</li>
      </ul>
      <a href="https://github.com/dmtrbrl/frontend-corner" target="__blank">
        GitHub
      </a>
    </footer>
  );
}
