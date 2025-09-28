import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Footer from "../components/Footer";

function Details() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [data, setData] = useState(null);

  const isTV = location.pathname.includes("/tv/"); // detect tv or movie
  const logoBase = "https://image.tmdb.org/t/p/original";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/${isTV ? "tv" : "movie"}/${id}?language=en-US&append_to_response=release_dates,content_ratings,watch/providers`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_TMDB_API}`,
              Accept: "application/json",
            },
          }
        );
        const result = await res.json();
        setData(result);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [id, isTV]);

  if (!data) return <p className="text-center mt-10">Loading...</p>;

  // Poster
  const poster = data.poster_path
    ? `https://image.tmdb.org/t/p/w400${data.poster_path}`
    : "/No-Poster.png";

  // Title
  const title = isTV ? data.name : data.title;

  // Description
  const overview = data.overview || "No overview available.";

  // Release Date / First Air Date
  const releaseDate = isTV
    ? data.first_air_date || "Not Available"
    : data.release_date || "Not Available";

  // Certification (Movie uses release_dates, TV uses content_ratings)
  let certification = "Not Rated";
  if (isTV) {
    const usRating = data.content_ratings?.results?.find(
      (r) => r.iso_3166_1 === "US"
    );
    certification = usRating?.rating || "Not Rated";
  } else {
    const usRelease = data.release_dates?.results?.find(
      (r) => r.iso_3166_1 === "US"
    );
    certification =
      usRelease?.release_dates?.[0]?.certification || "Not Rated";
  }

  // Genres
  const genres = data.genres?.length
    ? data.genres.map((g) => g.name).join(", ")
    : "Not Specified";

  // Watch Providers
  const providers =
    data["watch/providers"]?.results?.US?.flatrate ||
    data["watch/providers"]?.results?.US?.buy ||
    [];

  return (
    <>
      {/* Back Button */}
      <button
        onClick={() => navigate("/")}
        className="absolute top-6 left-6 flex items-center gap-2 text-yellow-400 hover:text-white transition"
      >
        <ArrowLeft size={22} /> Back
      </button>

      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl mx-auto">
        {/* Poster */}
        <div className="flex justify-center">
          <img
            src={poster}
            alt={title}
            className="rounded-lg shadow-lg max-h-[500px] object-contain"
          />
        </div>

        {/* Info Section */}
        <div className="flex flex-col justify-center">
          {/* Title */}
          <h1 className="text-4xl font-bold text-yellow-400 mb-4">{title}</h1>

          {/* Description */}
          <p className="text-white text-lg mb-4">{overview}</p>

          {/* Meta Info */}
          <p className="mt-2 text-white">
            <span className="text-yellow-400">⭐ Rating:</span> {certification}
          </p>
          <p className="mt-2 text-white">
            <span className="text-yellow-400">📅 {isTV ? "First Air:" : "Release Date:"}</span>{" "}
            {releaseDate}
          </p>
          <p className="mt-2 text-white">
            <span className="text-yellow-400">🎭 Genres:</span> {genres}
          </p>

          {/* Extra Info for TV Shows */}
          {isTV && (
            <>
              <p className="mt-2 text-white">
                <span className="text-yellow-400">📺 Seasons:</span>{" "}
                {data.number_of_seasons}
              </p>
              <p className="mt-2 text-white">
                <span className="text-yellow-400">🎬 Episodes:</span>{" "}
                {data.number_of_episodes}
              </p>
            </>
          )}

          {/* Watch Providers */}
          <div className="mt-6 text-center">
            <h2 className="text-xl font-semibold text-yellow-400 mb-4">
              Where to Watch:
            </h2>
            {providers.length > 0 ? (
              <div className="flex justify-center gap-6 flex-wrap">
                {providers.map((p) => (
                  <img
                    key={p.provider_id}
                    src={`${logoBase}${p.logo_path}`}
                    alt={p.provider_name}
                    className="h-12 w-12 object-contain rounded-full transform transition duration-300 hover:scale-110 hover:shadow-lg"
                    title={p.provider_name}
                  />
                ))}
              </div>
            ) : (
              <p className="text-white">
                Not available on major streaming platforms.
              </p>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Details;
