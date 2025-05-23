import { FC, ReactNode } from "react";
import Link from "next/link";
import { IoLogoWhatsapp } from "react-icons/io";
import { FaTelegram } from "react-icons/fa";

import styles from "./AppFooter.module.css";

interface AppFooterProps {
  children: ReactNode;
}

export const AppFooter: FC<AppFooterProps> = ({ children }) => {
  return (
    <footer className={styles.footer}>
      {children && <div className={styles.controls}>{children}</div>}
      <div className={styles.subscribe}>
        Subscribe:
        <Link href="#" target="__blank" title="WhatsApp">
          <IoLogoWhatsapp />
        </Link>
        <Link href="#" target="__blank" title="Telegram">
          <FaTelegram />
        </Link>
      </div>
    </footer>
  );
};
