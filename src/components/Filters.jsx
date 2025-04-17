import { useEffect, useState } from "react";

function Filters({ genres, selectedGenre, setSelectedGenre, sortOrder, setSortOrder,  minRating,  setMinRating }) {
  const [localGenre, setLocalGenre] = useState(selectedGenre || "");
  const [localSort, setLocalSort] = useState(sortOrder || "");
  const [localRating, setLocalRating] = useState(minRating || "");

  useEffect(() => {
    setSelectedGenre(localGenre);
  }, [localGenre]);

  useEffect(() => {
    setSortOrder(localSort);
  }, [localSort]);

  useEffect(() => {
    setMinRating(localRating);
  }, [localRating]);

  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6 justify-center items-center">
      {/* Filtro por Gênero */}
      <select
        className="border rounded px-4 py-2 bg-white text-black dark:bg-white dark:text-black"
        value={localGenre}
        onChange={(e) => setLocalGenre(e.target.value)}
      >
        <option value="">Todos os Gêneros</option>
        {genres.map((genre) => (
          <option key={genre.id} value={genre.id}>
            {genre.name}
          </option>
        ))}
      </select>

      {/* Ordenação */}
      <select
        className="border rounded px-4 py-2 bg-white text-black dark:bg-white dark:text-black"
        value={localSort}
        onChange={(e) => setLocalSort(e.target.value)}
      >
        <option value="">Ordenar por</option>
        <option value="title-asc">Título (A-Z)</option>
        <option value="title-desc">Título (Z-A)</option>
        <option value="rating-desc">Nota (Maior → Menor)</option>
        <option value="rating-asc">Nota (Menor → Maior)</option>
      </select>

      {/* Filtro por Nota Mínima */}
      <select
        className="border rounded px-4 py-2 bg-white text-black dark:bg-white dark:text-black"
        value={localRating}
        onChange={(e) => setLocalRating(e.target.value)}
      >
        <option value="">Nota mínima</option>
        <option value="9">9+</option>
        <option value="8">8+</option>
        <option value="7">7+</option>
        <option value="6">6+</option>
        <option value="5">5+</option>
      </select>
    </div>
  );
}

export default Filters;