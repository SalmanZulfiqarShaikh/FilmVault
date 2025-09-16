import { useEffect, useState } from "react";
import "./index.css";
import "./App.css";
import Search from "./components/Search";
import Loader from "./components/Loader";

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

  const fetchMovies = async () => {
    setIsLoading(true);
    setErrorMessage("");

    try {
      const endpoint = `${URL}/discover/movie?sort_by=popularity.desc`;
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

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <>
      <main>
        <div className="pattern" />

        <div className="wrapper">
          <header>
            <img src="./hero.png" alt="Hero Banner" />
            <h1>
              Your <span className="text-gradient">Go-To Hub</span> for Films
              and Shows
            </h1>
            <Search search={userSearch} setSearch={setUserSearch} />
          </header>

          <section className="all-movies">
            <br />
            <h2>Popular Movies:</h2>
            {isLoading ? (
              <Loader/>
            ) : errorMessage ? (
              <p className="text-red-700">{errorMessage}</p>
            ) : (
              <ul>
                {movies.map((movie) => (
                  <li key={movie.id} className="text-white">
                    {movie.title}
                  </li>
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
