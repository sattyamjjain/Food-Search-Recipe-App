import React, { useState, useEffect } from "react";
import Result from "./result";
import "./App.css";
import Pagination from "./Pagination";

const App = () => {
  const APP_ID = "42ed2494";
  const APP_KEY = "2658e189e9256bdf538db41366658475";

  const [results, setResult] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(4);

  useEffect(() => {
    const getResult = async () => {
      const response = await fetch(
        `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`
      );

      const data = await response.json();
      setResult(data.hits);
    };
    getResult();
  }, [query]);

  const updateSearch = event => {
    setSearch(event.target.value);
  };

  const getSearch = event => {
    event.preventDefault();
    setQuery(search);
    setSearch("");
  };

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = results.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <div className="App">
      <h1>Search Recipe App</h1>
      <form onSubmit={getSearch} className="search-form">
        <input
          className="search-input"
          type="text"
          value={search}
          onChange={updateSearch}
        ></input>
        <button className="search-button" type="submit">
          Search
        </button>
      </form>
      <div className="results">
        {currentPosts.map(result => (
          <Result
            title={result.recipe.label}
            url={result.recipe.url}
            image={result.recipe.image}
            calorie={result.recipe.calories}
            ingredients={result.recipe.ingredients}
          />
        ))}
      </div>
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={results.length}
        paginate={paginate}
      />
    </div>
  );
};

export default App;
