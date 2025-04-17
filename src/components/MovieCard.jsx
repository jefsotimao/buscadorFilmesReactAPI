import { Link } from "react-router-dom";

function MovieCard({ movie }) {
  return (
    <Link
      to={`/movie/${movie.id}`}
      className="bg-white shadow rounded p-2 hover:scale-105 transition"
    >
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        className="w-full object-contain rounded"
      />
      <h2 className="mt-2 font-semibold text-lg">{movie.title}</h2>
      <p className="text-sm text-gray-600">Nota: {movie.vote_average}</p>
    </Link>
  );
}

export default MovieCard;
