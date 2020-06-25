import React, { useState } from "react";

import { ReactComponent as Logo } from "../../assets/logo.svg";

import { getUserRepos } from "../../services/githubService";

import Repos from "../Repos/Repos";
import Search from "../Search/Search";

import style from "./App.module.css";

function App() {
  const [isLoading, setIsLoading] = useState();
  const [error, setError] = useState();
  const [repos, setRepos] = useState([]);

  const showSuggestions = !isLoading;
  const notFound = isLoading === false && !repos.length;

  const onSubmit = async (searchValue) => {
    setIsLoading(true);
    setError();
    try {
      const data = await getUserRepos(searchValue);

      setRepos(data);

      if (data.length) document.activeElement.blur();
    } catch (e) {
      setError("Something went wrong");
    }
    setIsLoading(false);
  };

  return (
    <div className={style.App}>
      <Logo className={style["App-logo"]} />

      <header className={style["App-header"]}>
        <Search onSubmit={onSubmit} showSuggestions={showSuggestions} />

        <div className={style["App-notification"]} role="alert">
          {error}
          {notFound && "No repos found"}
          {isLoading && "Loading..."}
        </div>
      </header>

      <main>
        <Repos data={repos} />
      </main>
    </div>
  );
}

export default App;
