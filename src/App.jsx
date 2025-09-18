import { useEffect, useState } from "react";
import "./index.css";
import "./App.css";
import Search from "./components/Search";
import Loader from "./components/Loader";
import MovieCard from "./components/MovieCard";

function App() {

  const [userSearch, setUserSearch] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const URL = "https://api.themoviedb.org/3";
  const API_KEY = import.meta.env.VITE_TMDB_API;

  const API_OPTIONS = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
  };

  const fetchMovies = async (query = '') => {
    setIsLoading(true);
    setErrorMessage("");

    try {
      const endpoint = query ?  `${URL}/search/movie?query=${encodeURIComponent(query)}` : `${URL}/discover/movie?sort_by=popularity.desc`;
      const response = await fetch(endpoint, API_OPTIONS);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.status_message || "Failed to fetch Content");
      }

      setMovies(data.results || []);
    } catch (error) {
      console.error("Error fetching Content:", error);
      setErrorMessage(
        "Error Fetching Content. Please Try Again. Thanks for your patience."
      );
    } finally {
      setIsLoading(false);
    }
  };

   // Debounce effect
  useEffect(() => {
    const delay = setTimeout(() => {
      fetchMovies(userSearch);
    }, 600); // wait 500ms after user stops typing

    return () => clearTimeout(delay); // cleanup on re-typing
  }, [userSearch]);

  return (
    <>
      <main>
        <div className="pattern" />

        <div className="wrapper">
          <header>
            <img src="./FilmVault.png" alt="logo" className="logo-" onClick={App}/>
            <img src="./hero.png" alt="Hero Banner" />
            <h1>
              Your <span className="text-gradient">Go-To Hub</span> for Films
              and Shows
            </h1>
            <Search search={userSearch} setSearch={setUserSearch} />
          </header>

          <section className="all-movies">
            <br />
            <h2 className="heading">Popular Movies:</h2>
            {isLoading ? (
              <Loader/>
            ) : errorMessage ? (
              <p className="text-red-700">{errorMessage}</p>
            ) : (
              <ul>
                {movies.map((movie) => (
                  
                    <MovieCard key={movie.id} movie={movie}/>
                  
                ))}
              </ul>
            )}
          </section>
        </div>
      </main>
    </>
  );
}

export default App;
