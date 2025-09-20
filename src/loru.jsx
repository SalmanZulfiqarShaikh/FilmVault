import { useEffect, useState } from "react";
import "./index.css";
import "./App.css";
import Search from "./components/Search";
import Loader from "./components/Loader";
import MovieCard from "./components/MovieCard";
import { getTopSearches, updateSearchCount } from "./appwrite";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Navigation, Pagination } from "swiper/modules";




function App() {

  const [userSearch, setUserSearch] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [movies, setMovies] = useState([]);
  const [tvShows, setTvShows] = useState([]);
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
      if (query && data.results.length > 0) {
        await updateSearchCount(query, data.results[0]);
      }
    } catch (error) {
      console.error("Error fetching Content:", error);
      setErrorMessage(
        "Error Fetching Content. Please Try Again. Thanks for your patience."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const fetchTvShows = async (query = '') => {
  setIsLoading(true);
  setErrorMessage("");

  try {
    const endpoint = query 
      ? `${URL}/search/tv?query=${encodeURIComponent(query)}` 
      : `${URL}/discover/tv?sort_by=popularity.desc`;

    const response = await fetch(endpoint, API_OPTIONS);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.status_message || "Failed to fetch Content");
    }

    setTvShows(data.results || []);
    if (query && data.results.length > 0) {
      await updateSearchCount(query, data.results[0]); // optional if you want tracking
    }
  } catch (error) {
    console.error("Error fetching TV Shows:", error);
    setErrorMessage(
      "Error Fetching TV Shows. Please Try Again. Thanks for your patience."
    );
  } finally {
    setIsLoading(false);
  }
};


  const loadTrendingContent = async () => {
     try {
      const movies = await getTopSearches();
      setTrendingContent(movies || []);
     } catch (error) {
      console.error("Error fetching trending movies:", error);
     }
  }
   // Debounce effect
  useEffect(() => {
    const delay = setTimeout(() => {
      fetchMovies(userSearch);
    }, 600); // wait 500ms after user stops typing

    return () => clearTimeout(delay); // cleanup on re-typing
  }, [userSearch]);


  useEffect(() => {
     loadTrendingContent();
  }, []);

  

  return (
    <>
      <main>
        

        <div className="wrapper">
          <header>
            {/* <img src="./FilmVault.png" alt="logo" className="logo-" onClick={App}/> */}
            <img src="./hero.png" alt="Hero Banner" />
            <h1>
              Your <span className="text-gradient">Go-To Hub</span> for Films
              and Shows
            </h1>
            <Search search={userSearch} setSearch={setUserSearch} />
          </header>

          {trendingContent.length > 0 && (
  <section className="trending">
    <h2>Trending Now :</h2>

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

      

<section className="all-movies">
  <br />
  <h2 className="heading">Popular Movies :</h2>
  <br />
  {isLoading ? (
    <Loader />
  ) : errorMessage ? (
    <p className="text-red-700">{errorMessage}</p>
  ) : (
    <div className="relative">
      {/* Slider */}
      <Swiper
        modules={[Navigation]}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        spaceBetween={15}
        breakpoints={{
          320: { slidesPerView: 2 },   // Mobile
          768: { slidesPerView: 4 },   // Tablet
          1024: { slidesPerView: 5 },  // Desktop
        }}
      >
        {movies.slice(0, 20).map((movie) => (
          <SwiperSlide key={movie.id}>
            <MovieCard movie={movie} />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Arrows */}
      <div className="swiper-button-prev !text-white !w-10 !h-10 !-left-14 after:!text-2xl" />
      <div className="swiper-button-next !text-white !w-10 !h-10 !-right-14 after:!text-2xl" />
    </div>
  )}
</section>



        </div>
      </main>
    </>
  );
}

export default App;
