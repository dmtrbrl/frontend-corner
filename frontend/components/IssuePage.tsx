import { Issue } from "@shared/types";
import { AppHeader } from "./AppHeader";
import AppFooter from "./AppFooter";
import { AppArticle } from "./AppArticle";

import styles from "./IssuePage.module.css";

interface IssuePageProps {
  issue: Issue;
}

export const IssuePage: React.FC<IssuePageProps> = ({ issue }) => {
  return (
    <section className={styles.issue}>
      <AppHeader title={`#${issue.no}`} />
      <ul className={styles.articles}>
        {issue.articles.map((a) => (
          <li key={a.title} className={styles.article}>
            <AppArticle article={a} />
          </li>
        ))}
      </ul>
      <div className={styles.extras}>
        <div className={styles.extra}>
          <strong>🎯 Challenge of the week</strong>
          <p>{issue.challenge}</p>
        </div>
        <div className={styles.extra}>
          <strong>😅 Joke of the week</strong>
          <p>{issue.joke}</p>
        </div>
      </div>
      <AppFooter />
    </section>
  );
};
