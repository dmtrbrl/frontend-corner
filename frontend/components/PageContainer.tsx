import { ReactNode } from "react";
import { AppHeader } from "./AppHeader";
import { AppFooter } from "./AppFooter";

import styles from "./PageContainer.module.css";

interface PageContainerProps {
  title?: string;
  controls?: ReactNode;
  children: ReactNode;
}

export const PageContainer: React.FC<PageContainerProps> = ({
  title,
  controls,
  children,
}) => {
  return (
    <section className={styles.container}>
      <div className={styles.wrapper}>
        <AppHeader title={title} />
        <main className={styles.content}>{children}</main>
        <AppFooter>{controls}</AppFooter>
      </div>
    </section>
  );
};
