import React, { useState, useEffect } from "react";

import { ReactComponent as SeachIcon } from "../../assets/search.svg";

import { getUserSuggestions } from "../../services/githubService";

import styles from "./Search.module.css";

function Search({ onSubmit, showSuggestions }) {
  const [searchValue, setSearchValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const fetchSuggestions = async (searchValue) => {
    try {
      const { items } = await getUserSuggestions(searchValue);
      setSuggestions(items);
    } catch (e) {
      setSuggestions([]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (searchValue) {
      setSuggestions([]);
      onSubmit(searchValue);
    }
  };

  useEffect(() => {
    if (searchValue.length > 2) {
      fetchSuggestions(searchValue);
    } else {
      setSuggestions([]);
    }
  }, [searchValue]); //eslint-disable-line

  return (
    <form onSubmit={handleSubmit} className={styles.Search} autoComplete="off">
      <input
        name="search"
        type="text"
        value={searchValue}
        placeholder="Find repos"
        onChange={(e) => setSearchValue(e.target.value)}
      />
      <ul>
        {showSuggestions &&
          suggestions.map((s) => (
            <li key={s.id}>
              <button onClick={() => setSearchValue(s.login)}>{s.login}</button>
            </li>
          ))}
      </ul>
      <button>
        <SeachIcon />
      </button>
    </form>
  );
}

export default Search;
