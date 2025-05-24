import Link from "next/link";
import {
  FaLinkedin,
  FaSquareFacebook,
  FaSquareXTwitter,
} from "react-icons/fa6";
import { IoLogoWhatsapp } from "react-icons/io";
import { FaTelegram } from "react-icons/fa";

import styles from "./AppFooter.module.css";

export const AppFooter = () => {
  const url = "#";

  return (
    <footer className={styles.footer}>
      <div className={styles.social}>
        Share:
        <Link href={url} target="__blank" title="Facebook">
          <FaSquareFacebook />
        </Link>
        <Link href={url} target="__blank" title="X">
          <FaSquareXTwitter />
        </Link>
        <Link href={url} target="__blank" title="LinkedIn">
          <FaLinkedin />
        </Link>
      </div>
      <div className={styles.social}>
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
