import { useState, useEffect } from "react";

const FAVORITES_STORAGE_KEY = "nasa_epic_favorites";

function useFavorites() {
  const [favorites, setFavorites] = useState(() => {
    try {
      const storedFavorites = localStorage.getItem(FAVORITES_STORAGE_KEY);
      if (storedFavorites) {
        return JSON.parse(storedFavorites);
      }
    } catch (error) {
      console.error("Error loading favorites from localStorage:", error);
    }
    return [];
  });

  useEffect(() => {
    try {
      localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites));
      console.log(`Favorites saved to localStorage: ${favorites.length} items`);
    } catch (error) {
      console.error("Error saving favorites to localStorage:", error);
    }
  }, [favorites]);

  function addFavorite(item) {
    setFavorites((prevFavorites) => {
      const exists = prevFavorites.some(
        (fav) => fav.identifier === item.identifier,
      );

      if (exists) {
        console.log(`Item ${item.identifier} is already in favorites`);
        return prevFavorites;
      }

      console.log(`Adding ${item.identifier} to favorites`);
      return [...prevFavorites, item];
    });
  }

  function removeFavorite(identifier) {
    setFavorites((prevFavorites) => {
      console.log(`Removing ${identifier} from favorites`);
      return prevFavorites.filter((fav) => fav.identifier !== identifier);
    });
  }

  function toggleFavorite(item) {
    const exists = favorites.some((fav) => fav.identifier === item.identifier);

    if (exists) {
      removeFavorite(item.identifier);
    } else {
      addFavorite(item);
    }
  }

  function isFavorite(identifier) {
    if (!identifier) return false;
    return favorites.some((fav) => fav.identifier === identifier);
  }

  function clearFavorites() {
    setFavorites([]);
  }

  return {
    favorites,
    addFavorite,
    removeFavorite,
    toggleFavorite,
    isFavorite,
    clearFavorites,
    count: favorites.length,
  };
}

export default useFavorites;
