import { useEffect, useState } from "react";
import "./index.css";
import "./App.css";
import Search from "./components/Search";
import Loader from "./components/Loader";
import MovieCard from "./components/MovieCard";
import { getTopSearches, updateSearchCount } from "./appwrite";
import Slider from "./components/Slider";

function App() {
  const [userSearch, setUserSearch] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [movies, setMovies] = useState([]);
  const [tvShows, setTvShows] = useState([]);
  const [comedyMovies, setComedyMovies] = useState([]);
  const [actionMovies, setActionMovies] = useState([]);
  const [horrorMovies, setHorrorMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [trendingContent, setTrendingContent] = useState([]);

  const URL = "https://api.themoviedb.org/3";
  const API_KEY = import.meta.env.VITE_TMDB_API;

  const API_OPTIONS = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
  };

  // Fetch Movies
  const fetchMovies = async (query = "") => {
    setIsLoading(true);
    setErrorMessage("");

    try {
      const endpoint = query
        ? `${URL}/search/movie?query=${encodeURIComponent(query)}`
        : `${URL}/discover/movie?sort_by=popularity.desc`;

      const response = await fetch(endpoint, API_OPTIONS);
      const data = await response.json();

      if (!response.ok) throw new Error(data.status_message || "Failed to fetch movies");

      setMovies(data.results || []);

      if (query && data.results.length > 0) {
        await updateSearchCount(query, data.results[0]);
      }
    } catch (error) {
      console.error("Error fetching Movies:", error);
      setErrorMessage("Error fetching movies. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch TV Shows
  const fetchTvShows = async (query = "") => {
    setIsLoading(true);
    setErrorMessage("");

    try {
      const endpoint = query
        ? `${URL}/search/tv?query=${encodeURIComponent(query)}`
        : `${URL}/discover/tv?sort_by=popularity.desc`;

      const response = await fetch(endpoint, API_OPTIONS);
      const data = await response.json();

      if (!response.ok) throw new Error(data.status_message || "Failed to fetch TV shows");

      setTvShows(data.results || []);

      if (query && data.results.length > 0) {
        await updateSearchCount(query, data.results[0]);
      }
    } catch (error) {
      console.error("Error fetching TV Shows:", error);
      setErrorMessage("Error fetching TV shows. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch Comedy, Action, Horror movies
  const fetchGenreMovies = async () => {
    try {
      // Comedy
      const comedyRes = await fetch(`${URL}/discover/movie?with_genres=35`, API_OPTIONS);
      const comedyData = await comedyRes.json();
      setComedyMovies(comedyData.results || []);

      // Action
      const actionRes = await fetch(`${URL}/discover/movie?with_genres=28`, API_OPTIONS);
      const actionData = await actionRes.json();
      setActionMovies(actionData.results || []);

      // Horror
      const horrorRes = await fetch(`${URL}/discover/movie?with_genres=27`, API_OPTIONS);
      const horrorData = await horrorRes.json();
      setHorrorMovies(horrorData.results || []);
    } catch (error) {
      console.error("Error fetching genre movies:", error);
    }
  };

  // Load trending from Appwrite
  const loadTrendingContent = async () => {
    try {
      const movies = await getTopSearches();
      setTrendingContent(movies || []);
    } catch (error) {
      console.error("Error fetching trending movies:", error);
    }
  };

  // Debounced Search → Movies + TV
  useEffect(() => {
    const delay = setTimeout(() => {
      if (userSearch.trim() !== "") {
        fetchMovies(userSearch);
        fetchTvShows(userSearch);
      } else {
        fetchMovies();
        fetchTvShows();
        fetchGenreMovies();
        loadTrendingContent();
      }
    }, 600);

    return () => clearTimeout(delay);
  }, [userSearch]);

  // Initial load
  useEffect(() => {
    fetchMovies();
    fetchTvShows();
    fetchGenreMovies();
    loadTrendingContent();
  }, []);

  return (
    <>
      <main>
        <div className="wrapper">
          <header>
            <img src="./hero.png" alt="Hero Banner" />
            <h1>
              Your <span className="text-gradient">Go-To Hub</span> for Films
              and Shows
            </h1>
            <Search search={userSearch} setSearch={setUserSearch} />
          </header>

          {/* IF searching → only show results */}
          {userSearch ? (
            <section className="search-results">
                <br />
              <h2>Search Results for "{userSearch}" :</h2>
              <br />
              <br />
              {isLoading ? (
                <Loader />
              ) : errorMessage ? (
                <p className="text-red-700">{errorMessage}</p>
              ) : movies.length === 0 && tvShows.length === 0 ? (
                <p>No results found.</p>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {[...movies, ...tvShows].map((item) => (
                    <MovieCard key={item.id} movie={item} />
                  ))}
                </div>
              )}
            </section>
          ) : (
            <>
              {/* Trending */}
              {trendingContent.length > 0 && (
                <section className="trending">
                  <h2>Trending Now 🔥</h2>
                  <ul>
                    {trendingContent.map((movie, index) => (
                      <li key={movie.id || index}>
                        <p>{index + 1}</p>
                        <img
                          src={
                            movie.poster_url ||
                            (movie.poster_path
                              ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
                              : "/fallback.png")
                          }
                          alt={movie.title}
                        />
                        <p>{movie.title}</p>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {/* Popular Movies */}
<section className="all-movies">
  <br />
  <h2 className="heading">Popular Movies :</h2>
  <br />
  {isLoading ? (
    <Loader />
  ) : errorMessage ? (
    <p className="text-red-700">{errorMessage}</p>
  ) : movies.length > 0 ? (
    <Slider
      items={movies.slice(0, 20)}
      uniqueKey="movies"
      renderItem={(movie) => <MovieCard movie={movie} />}
    />
  ) : (
    <p>No Results Found</p>
  )}
</section>

{/* Popular TV Shows */}
<section className="all-movies">
  <br />
  <br />
  <h2 className="heading">Popular TV Shows :</h2>
  <br />
  {isLoading ? (
    <Loader />
  ) : tvShows.length > 0 ? (
    <Slider
      items={tvShows.slice(0, 20)}
      uniqueKey="tv"
      renderItem={(tv) => <MovieCard movie={tv} />}
    />
  ) : (
    <p>No Results Found</p>
  )}
</section>


            {/* Comedy Movies */}
            <section className="all-movies">
                <br />
                <br />
              <h2 className="heading">Comedy Movies 😂</h2>
              <br />
              {comedyMovies.length > 0 ? (
                <Slider
                  items={comedyMovies.slice(0, 20)}
                  uniqueKey="comedy"
                  renderItem={(movie) => <MovieCard movie={movie} />}
                />
              ) : (
                <p>No Comedy Movies Found</p>
              )}
            </section>

            {/* Action Movies */}
            <section className="all-movies">
                <br />
                <br />
              <h2 className="heading">Action Movies 🍿</h2>
              <br />
              {actionMovies.length > 0 ? (
                <Slider
                  items={actionMovies.slice(0, 20)}
                  uniqueKey="action"
                  renderItem={(movie) => <MovieCard movie={movie} />}
                />
              ) : (
                <p>No Action Movies Found</p>
              )}
            </section>

            {/* Horror Movies */}
            <section className="all-movies">
                <br />
                <br />
              <h2 className="heading">Horror Movies ☠️</h2>
              <br />
              {horrorMovies.length > 0 ? (
                <Slider
                  items={horrorMovies.slice(0, 20)}
                  uniqueKey="horror"
                  renderItem={(movie) => <MovieCard movie={movie} />}
                />
              ) : (
                <p>No Horror Movies Found</p>
              )}
            </section>

            </>
          )}
        </div>
      </main>
    </>
  );
}

export default App;
