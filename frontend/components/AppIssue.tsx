import { Issue } from "@shared/types";
import { AppHeader } from "./AppHeader";

import styles from "./AppIssue.module.css";
import AppFooter from "./AppFooter";
import { AppArticle } from "./AppArticle";

interface IssueProps {
  issue: Issue;
}

export const AppIssue: React.FC<IssueProps> = ({ issue }) => {
  return (
    <section className={styles.issue}>
      <AppHeader title={`#${issue.no}`} />
      <ul className={styles.articles}>
        {issue.articles.map((a) => (
          <li key={a.pubDate} className={styles.article}>
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
