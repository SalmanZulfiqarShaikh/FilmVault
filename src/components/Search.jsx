import React from "react";
import "../index.css";

function Search({ search, setSearch }) {
  return (
    <div className="search">
      <div>
        <img src="search.png" alt="search" />
        <input
          type="text"
          value={search}
          placeholder="Find your next binge"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
    </div>
  );
}

export default Search;

