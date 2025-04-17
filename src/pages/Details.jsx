import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchMovieDetails } from "../services/api";
import { isFavorite, toggleFavorite } from "../utils/favorites";

function Details(){

  const {id} = useParams();
  const [movie,setMovie] = useState(null);
  const [favorite,setFavorite] = useState(false);
  
  useEffect(()=>{
    fetchMovieDetails(id).then(setMovie);
    setFavorite(isFavorite(id));
  },[id])

  const handleToggleFavorite = () => {
    toggleFavorite(id);
    setFavorite(prev => !prev);
  };

  if(!movie) return <p className="text-center mt-10">Carregando...</p>;

  return(
    <div className="p-4 max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row gap-6">
        <img 
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="rounded w-full md:w-1/3 object-cover"
        />
        <div>
          <h1 className="text-3xl font-bold mb-2">{movie.title}</h1>
          <p className="text-gray-700 mb-4">{movie.overview}</p>
          <p className="mb-2">🎬 <strong>Gêneros:</strong> {movie.genres.map(g => g.name).join(',')}</p>
          <p>⭐ <strong>Avaliação:</strong> {movie.vote_average}</p>
          <p>📅 <strong>Lançamento:</strong> {movie.release_date}</p>
          <button
            onClick={handleToggleFavorite}
            className={`mt-4 px-4 py-2 rounded text-white ${
              favorite ? "bg-red-500" : "bg-green-600"
            } hover:opacity-90 transition`}
          >
            {favorite ? "Remover dos Favoritos" : "Adicionar aos Favoritos"}
          </button>
        </div>
      </div>
    </div>
  )

}

export default Details;
