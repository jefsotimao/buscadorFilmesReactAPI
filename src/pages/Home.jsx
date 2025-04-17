import { useEffect, useState, useMemo  } from "react";
import { fetchPopularMovies, searchMovies, fetchGenres  } from "../services/api";
import { useDebounce } from "use-debounce";
import SearchInput from "../components/SearchInput";
import MovieGrid from "../components/MovieGrid";
import SkeletonCard from "../components/SkeletonCard";
import Filters from "../components/Filters";

function Home() {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 500);
  const [page,setPage] = useState(1);
  const [loading,setLoading] = useState(false);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [minRating, setMinRating] = useState("");

  const loadGenres = async () => {
    const data = await fetchGenres();
    setGenres(data);
  };

  const loadPopular = async (pageNumber = 1, isLoadMore = false) => {
    setLoading(true);
    const data = await fetchPopularMovies(pageNumber);
    if (isLoadMore) {
      setMovies((prev) => [...prev, ...data]);
    } else {
      setMovies(data);
    }
    setLoading(false);
  };

  const loadSearch = async (query) => {
    setLoading(true);
    const results = await searchMovies(query);
    setMovies(results);
    setLoading(false);
  };

  useEffect(() => {
    loadGenres();
  }, []);

  useEffect(() => {
    if (debouncedSearch.trim() === "") {
      setPage(1); // resetar página se limpar busca
      loadPopular();
    } else {
      loadSearch(debouncedSearch);
    }
  }, [debouncedSearch]);


  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    loadPopular(nextPage, true); // busca a próxima página e adiciona
  };

  const filteredAndSortedMovies = useMemo(() => {
    let result = [...movies];
  
    if (selectedGenre) {
      result = result.filter((movie) =>
        movie.genre_ids.includes(parseInt(selectedGenre))
      );
    }
  
    if (minRating) {
      result = result.filter((movie) => movie.vote_average >= parseFloat(minRating));
    }
  
    if (sortOrder === "title-asc") {
      result.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortOrder === "title-desc") {
      result.sort((a, b) => b.title.localeCompare(a.title));
    } else if (sortOrder === "rating-desc") {
      result.sort((a, b) => b.vote_average - a.vote_average);
    } else if (sortOrder === "rating-asc") {
      result.sort((a, b) => a.vote_average - b.vote_average);
    }
  
    return result;
  }, [movies, selectedGenre, sortOrder, minRating]);

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4 text-center">
        🎬 Buscador de Filmes
      </h1>

      <SearchInput value={search} onChange={setSearch} />
      
      <Filters
        genres={genres}
        selectedGenre={selectedGenre}
        setSelectedGenre={setSelectedGenre}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
        minRating={minRating}
        setMinRating={setMinRating}
      />

      <MovieGrid movies={filteredAndSortedMovies} loading={loading} />

       {/* Mostrar botão de carregar mais se não estiver pesquisando */}
       {debouncedSearch.trim() === "" && (
        <div className="flex justify-center mt-6">
          <button
            onClick={handleLoadMore}
            disabled={loading}
            className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
          >
            {loading ? "Carregando..." : "Carregar mais"}
          </button>
        </div>
      )}
    </div>
  );
}

export default Home;
