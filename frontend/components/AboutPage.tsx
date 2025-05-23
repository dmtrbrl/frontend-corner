import { PageContainer } from "./PageContainer";
import styles from "./AboutPage.module.css";

export const AboutPage = () => {
  return (
    <PageContainer title="About">
      <div className={styles.content}>About</div>
    </PageContainer>
  );
};
