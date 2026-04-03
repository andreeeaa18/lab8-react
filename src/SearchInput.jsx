import { createContext, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import DataGrid from "./DataGrid";
import Favorites from "./Favorites";
import DetailedInfo from "./DetailedInfo";
import useFavorites from "./hooks/useFavorites";

export const spaceContext = createContext();

function SearchInput() {
  const [inputValue, setInputValue] = useState("");
  const [mostRecent, setMostRecent] = useState(false);

  const [currentView, setCurrentView] = useState("grid");
  const [selectedCard, setSelectedCard] = useState(null);

  const {
    data,
    isLoading: loading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["nasa-epic-natural"],
    queryFn: () =>
      fetch(
        "https://epic.gsfc.nasa.gov/api/natural?api_key=8mCbugQFL7t8WyOuZhzNkuQafB6ntPmifaFZKoyV",
      ).then((r) => {
        if (!r.ok) {
          throw new Error("Failed to fetch data");
        }
        return r.json();
      }),
    staleTime: 5 * 60 * 1000,
  });

  const {
    favorites,
    addFavorite,
    removeFavorite,
    toggleFavorite,
    isFavorite,
    clearFavorites,
    count: favoritesCount,
  } = useFavorites();

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner">Loading NASA EPIC images...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <div className="error-box">
          <h2>Error loading data</h2>
          <p>{error.message || "An error occurred while fetching data"}</p>
        </div>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="empty-container">
        <div className="empty-box">
          <h2>Welcome to NASA EPIC </h2>
        </div>
      </div>
    );
  }

  function toggleFilter() {
    setMostRecent(!mostRecent);
  }

  function handleCardClick(cardData) {
    setSelectedCard(cardData);
    setCurrentView("details");
  }

  function handleBackToGrid() {
    setCurrentView("grid");
    setSelectedCard(null);
  }

  function handleBackToGridFromFavorites() {
    setCurrentView("grid");
  }

  const contextValue = {
    data,
    favorites,
    addFavorite,
    removeFavorite,
    toggleFavorite,
    isFavorite,
    clearFavorites,
  };

  return (
    <>
      <spaceContext.Provider value={contextValue}>
        {currentView === "details" ? (
          <DetailedInfo data={selectedCard} onBack={handleBackToGrid} />
        ) : currentView === "favorites" ? (
          <>
            <button
              onClick={handleBackToGridFromFavorites}
              className="nav-button"
            >
              Back
            </button>
            <Favorites onCardClick={handleCardClick} />
          </>
        ) : (
          <div>
            <div className="header">
              <h1>NASA EPIC Image Gallery</h1>

              <div className="controls">
                <input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  className="search-input"
                />

                <button className="filter-button" onClick={toggleFilter}>
                  {mostRecent ? "Most recent" : "Filter most recent"}
                </button>

                <button
                  onClick={() => setCurrentView("favorites")}
                  className="filter-button"
                >
                  Favorites
                </button>

                <button onClick={refetch} className="filter-button">
                  Refresh
                </button>
              </div>
            </div>
            <DataGrid
              mostRecent={mostRecent}
              inputValue={inputValue}
              onCardClick={handleCardClick}
            />
          </div>
        )}
      </spaceContext.Provider>
    </>
  );
}

export default SearchInput;
//array in care adaug cele favorite si verific daca este in array sau nu e un state
