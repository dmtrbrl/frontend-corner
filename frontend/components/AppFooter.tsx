import { FC } from "react";
import Link from "next/link";
import {
  FaLinkedin,
  FaSquareFacebook,
  FaSquareXTwitter,
} from "react-icons/fa6";
import { FaTelegram } from "react-icons/fa";

import styles from "./AppFooter.module.css";

interface FooterProps {
  issueNo?: number;
}

export const AppFooter: FC<FooterProps> = ({ issueNo }) => {
  const baseUrl = "https://www.frontendcorner.com";
  const sharePath = issueNo ? `/issue/${issueNo}` : "/";
  const shareUrl = `${baseUrl}${sharePath}`;

  const facebookShare = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
    shareUrl
  )}`;
  const xShare = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
    shareUrl
  )}`;
  const linkedinShare = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
    shareUrl
  )}`;

  return (
    <footer className={styles.footer}>
      <div className={styles.social}>
        Share:
        <Link href={facebookShare} target="_blank" title="Facebook">
          <FaSquareFacebook />
        </Link>
        <Link href={xShare} target="_blank" title="X">
          <FaSquareXTwitter />
        </Link>
        <Link href={linkedinShare} target="_blank" title="LinkedIn">
          <FaLinkedin />
        </Link>
      </div>
      <div className={styles.social}>
        Subscribe:
        <Link
          href="https://t.me/frontendcorner"
          target="_blank"
          title="Telegram"
        >
          <FaTelegram />
        </Link>
      </div>
    </footer>
  );
};
