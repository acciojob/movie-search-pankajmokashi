import React, { useState } from "react";
import "./../styles/App.css";

const API_KEY = "d14b0d23";
const App = () => {
  let [search, setSearch] = useState("");
  let [data, setData] = useState("");
  let [error, setError] = useState("");

  function handleChange() {
    fetch(`http://www.omdbapi.com/?s=${search}&apikey=${API_KEY}`)
      .then((res) => res.json())
      .then((res) => {
        if(res.Response == "True"){
          setData(res.Search);
        }
        else{
          setError("Invalid movie name. Please try again.")
        }
      })
  }

  return (
    <div>
      {/* Do not remove the main div */}
      <div>
        <div>Search Movies</div>
        <div>
          <input
            type="search"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          ></input>
          <button onClick={handleChange}>Search</button>
        </div>
        <ul>
        {
          data.length > 0 &&
            data.map((movie) => (
              <li key={movie.imdbID}>
                <div>{movie.Title}</div>
                <div>
                  <img src={movie.Poster} alt="img"></img>
                </div>
              </li>
            ))
        }
        </ul>
        {
          error &&
          <div className="error">{error}</div>
        }
        
      </div>
    </div>
  );
};

export default App;
