import { ReactNode } from "react";
import { AppHeader } from "./AppHeader";
import { AppFooter } from "./AppFooter";

import styles from "./PageContainer.module.css";

interface PageContainerProps {
  title?: string;
  issueNo?: number;
  children: ReactNode;
}

export const PageContainer: React.FC<PageContainerProps> = ({
  title,
  issueNo,
  children,
}) => {
  return (
    <section className={styles.container}>
      <div className={styles.wrapper}>
        <AppHeader title={title} />
        <main className={styles.content}>{children}</main>
        <AppFooter issueNo={issueNo} />
      </div>
    </section>
  );
};
