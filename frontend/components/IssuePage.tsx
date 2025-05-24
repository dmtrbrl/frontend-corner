import { FC } from "react";
import Link from "next/link";
import { GrFormNextLink, GrFormPreviousLink } from "react-icons/gr";

import { Issue } from "@shared/types";
import { AppArticle } from "./AppArticle";
import { PageContainer } from "./PageContainer";

import styles from "./IssuePage.module.css";

interface PaginationProps {
  count: number;
  current: number;
}

const Pagination: FC<PaginationProps> = ({ count, current }) => {
  const hasPrev = current > 1;
  const hasNext = current < count;

  return (
    <div className={styles.pagination}>
      {hasPrev ? (
        <Link href={`/issue/${current - 1}`} title="Previous Issue">
          <GrFormPreviousLink /> previous
        </Link>
      ) : (
        <span>
          <GrFormPreviousLink /> previous
        </span>
      )}

      {hasNext ? (
        <Link href={`/issue/${current + 1}`} title="Next Issue">
          next <GrFormNextLink />
        </Link>
      ) : (
        <span>
          next <GrFormNextLink />
        </span>
      )}
    </div>
  );
};

interface IssuePageProps {
  count: number;
  issue: Issue;
}

export const IssuePage: FC<IssuePageProps> = ({ count, issue }) => {
  return (
    <PageContainer title={`Issue #${issue.no}`}>
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
      <Pagination count={count} current={issue.no} />
    </PageContainer>
  );
};
