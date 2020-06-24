import React from "react";

import styles from "./Repos.module.css";

function Repos({ data }) {
  const maxSize = Math.max(...data.map((r) => r.size)) || 1;
  const maxStars = Math.max(...data.map((r) => r.stargazers_count)) || 1;

  return (
    <ul
      className={styles.Repos}
      style={{
        "--repo-amount": data.length,
        "--repo-max-size": maxSize,
        "--repo-max-stars": maxStars,
      }}
    >
      {data.map((r) => (
        <li
          key={r.id}
          style={{
            "--repo-size": r.size,
            "--repo-stars": r.stargazers_count,
          }}
        >
          <figure tabIndex={0}>
            <figcaption>{r.name}</figcaption>
            <code>
              name: {r.name}; <br />
              stargazers: {r.stargazers_count}; <br />
              size: {r.size}; <br />
            </code>
            <svg className={styles["Repos-stats"]}>
              <title>Repo stats</title>
              <rect className={styles["Repos-size"]}></rect>
              <rect className={styles["Repos-stars"]}></rect>
            </svg>
          </figure>
        </li>
      ))}
    </ul>
  );
}

export default Repos;
