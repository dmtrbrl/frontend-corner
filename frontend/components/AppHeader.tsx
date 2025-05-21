import { FC } from "react";
import Link from "next/link";
import styles from "./AppHeader.module.css";
import { AppLogo } from "./AppLogo";

interface HeaderProps {
  issueNo?: number;
}

export const AppHeader: FC<HeaderProps> = ({ issueNo }) => {
  return (
    <header className={styles.header}>
      <div className={styles.control}>
        <strong className={styles.issueNo}>#{issueNo}</strong>
      </div>
      <Link href="/">
        <AppLogo className={styles.logo} />
      </Link>
      <div className={styles.control}>
        <Link href="/archive">Archive</Link>
      </div>
    </header>
  );
};
