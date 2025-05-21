"use client";

import { FC, useState } from "react";
import clsx from "clsx";
import Link from "next/link";
import styles from "./AppHeader.module.css";
import { AppLogo } from "./AppLogo";

interface HeaderProps {
  title: string;
}

export const AppHeader: FC<HeaderProps> = ({ title }) => {
  const [showMenu, setShowMenu] = useState<boolean>(false);

  return (
    <>
      <header className={styles.header}>
        <div className={styles.title}>{title}</div>
        <Link href="/">
          <AppLogo className={styles.logo} />
        </Link>
        <button
          className={clsx(styles.menuButton, {
            [styles.menuButtonActive]: showMenu,
          })}
          onClick={() => setShowMenu(!showMenu)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </header>
      {showMenu && (
        <nav className={styles.nav}>
          <ul>
            <li>
              <Link href="/archive">Archive</Link>
            </li>
            <li>
              <Link href="/about">About</Link>
            </li>
            <li>
              <Link
                href="https://github.com/dmtrbrl/frontend-corner"
                target="__blank"
              >
                GitHub
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </>
  );
};
