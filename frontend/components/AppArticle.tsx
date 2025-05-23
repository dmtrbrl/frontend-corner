/* eslint-disable @next/next/no-img-element */
import { FC } from "react";
import { Article } from "@shared/types";

import styles from "./AppArticle.module.css";

interface ArticleProps {
  article: Article;
}

export const AppArticle: FC<ArticleProps> = ({ article }) => {
  const date = new Date(article.pubDate);
  const formattedDate = new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
  return (
    <a href={article.url} target="__blank" className={styles.article}>
      <div className={styles.articleInner}>
        <div>
          <h2 className={styles.articleHeading}>{article.title}</h2>
          <p>{article.description}</p>
        </div>

        {article.img && <img src={article.img} alt={article.title} />}
      </div>
      <div className={styles.articleInfo}>
        <em>By {article.author}</em>
        <span>{formattedDate}</span>
      </div>
    </a>
  );
};
