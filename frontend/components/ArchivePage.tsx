import { PageContainer } from "./PageContainer";
import { getAllIssues } from "@shared/services";
import { formattedDate } from "../utils/formattedDate";

import styles from "./ArchivePage.module.css";
import Link from "next/link";

export const ArchivePage = async () => {
  const issues = await getAllIssues();

  return (
    <PageContainer title="Archive">
      <ul className={styles.issues}>
        {issues.map((i) => {
          return (
            <li key={i.pubDate} className={styles.issue}>
              <Link href={`/issue/${i.no}`}>
                <header>
                  <span>Issue #{i.no}</span>
                  <span className={styles.date}>
                    {formattedDate(i.pubDate)}
                  </span>
                </header>
                <p>{i.description}</p>
              </Link>
            </li>
          );
        })}
      </ul>
    </PageContainer>
  );
};
