import { FC, ReactNode } from "react";
import styles from "./AppFooter.module.css";

interface AppFooterProps {
  children: ReactNode;
}

export const AppFooter: FC<AppFooterProps> = ({ children }) => {
  return (
    <footer className={styles.footer}>
      {children && <div>{children}</div>}
      <div>Share</div>
    </footer>
  );
};
