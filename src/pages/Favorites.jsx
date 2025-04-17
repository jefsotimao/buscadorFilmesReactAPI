import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getFavorites } from "../utils/favorites";
import { fetchMovieDetails } from "../services/api";
import MovieGrid from "../components/MovieGrid";

function Favorites() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFavorites = async () => {
      setLoading(true);
      const ids = getFavorites();
      const requests = ids.map(id => fetchMovieDetails(id));
      const results = await Promise.all(requests);
      setMovies(results);
      setLoading(false);
    };
    loadFavorites();
  }, []);

  if (movies.length === 0) {
    return <p className="text-center mt-10">Nenhum filme favoritado ainda.</p>;
  }

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4 text-center">❤️ Meus Favoritos</h1>
      <MovieGrid movies={movies} loading={loading} />
    </div>
  );
}

export default Favorites;