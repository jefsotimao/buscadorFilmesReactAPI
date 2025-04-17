const FAVORITES_KEY = "favoriteMovies";

export const getFavorites = () => {
  const stored = localStorage.getItem(FAVORITES_KEY);
  return stored ? JSON.parse(stored) : [];
};

export const isFavorite = (id) => {
  const favorites = getFavorites();
  return favorites.includes(id);
};

export const toggleFavorite = (id) => {
  const favorites = getFavorites();
  const updated = favorites.includes(id)
    ? favorites.filter(favId => favId !== id)
    : [...favorites, id];
    
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
};

export const removeFavorite = (id) => {
  const favorites = getFavorites();
  const updated = favorites.filter(favId => favId !== id);
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
};