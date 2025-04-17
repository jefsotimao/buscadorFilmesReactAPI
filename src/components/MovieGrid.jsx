import MovieCard from "./MovieCard";
import SkeletonCard from "./SkeletonCard";

function MovieGrid({ movies, loading }) {
  return (
    <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {loading
        ? Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)
        : movies.length > 0
        ? movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))
        : (
          <p className="col-span-full text-center text-gray-500">
            Nenhum filme encontrado.
          </p>
        )
      }
    </div>
  );
}

export default MovieGrid;