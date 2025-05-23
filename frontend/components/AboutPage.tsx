import { PageContainer } from "./PageContainer";
import styles from "./AboutPage.module.css";

export const AboutPage = () => {
  return (
    <PageContainer title="About">
      <div className={styles.content}>
        <p>
          <b>Frontend Corner</b> is an experimental, <b>AI-curated</b> weekly
          digest for frontend developers who want to stay current with the
          latest in UI, web development, and related technologies – without
          spending hours chasing down quality content.
        </p>
        <p>
          Each week, it scans a curated list of RSS feeds, collecting fresh
          articles and updates from trusted sources across the frontend
          landscape. The AI then steps in to review, summarize, and organize the
          content into a fully described, issue-style digest. It doesn’t just
          list links – it provides context, commentary, and a snapshot of what’s
          actually worth your attention.
        </p>
        <p>
          Although this is a solo project, it’s also open for contributions.{" "}
          <a
            href="https://github.com/dmtrbrl/frontend-corner/blob/main/data/sources.json"
            target="__blank"
          >
            The list of sources
          </a>{" "}
          is managed on GitHub, and anyone is welcome to suggest new RSS feeds
          or update existing ones. It’s not a community project in the
          traditional sense, but it’s open, transparent, and benefits from
          collective input.
        </p>
        <p>
          Frontend Corner is more than just a curated feed – it’s an ongoing
          experiment in using AI to not only gather information but also curate,
          interpret, and present it in a useful, developer-friendly way. If that
          sounds like your kind of thing, you’re in the right corner of the web.
        </p>
      </div>
    </PageContainer>
  );
};
