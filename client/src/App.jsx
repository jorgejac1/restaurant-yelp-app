import React, { useEffect, useState, useCallback } from "react";
import classNames from "classnames";
import Restaurant from "./components/Restaurant";
import Loader from "./components/Loader";
import categoriesList from "./data/categories";
import {
  fetchData,
  filterRestaurants,
  handleScrollForLoadingMore,
  debounce
} from "./utils/utils";
import styles from "./App.module.scss";

const INITIAL_ITEM_COUNT = 15;

function App() {
  const [loadingMore, setLoadingMore] = useState(false);
  const [allRestaurants, setAllRestaurants] = useState([]);
  const [displayedRestaurants, setDisplayedRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("");
  const [lastIndex, setLastIndex] = useState(INITIAL_ITEM_COUNT);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData(
      setAllRestaurants,
      setDisplayedRestaurants,
      INITIAL_ITEM_COUNT
    ).catch((error) => {
      console.error("Error fetching restaurants:", error);
      setError("Failed to load restaurants. Please try again later.");
    })
    .finally(() => {
      setLoading(false);
    });
  }, []);

  const loadMoreRestaurants = useCallback(() => {
    if (loadingMore || allRestaurants.length <= displayedRestaurants.length)
      return;
    setLoadingMore(true);

    setTimeout(() => {
      const nextIndex = lastIndex + INITIAL_ITEM_COUNT;
      const moreRestaurants = allRestaurants.slice(lastIndex, nextIndex);
      setDisplayedRestaurants((prevRestaurants) => [
        ...prevRestaurants,
        ...moreRestaurants,
      ]);
      setLastIndex(nextIndex);
      setLoadingMore(false);
    }, 1000);
  }, [lastIndex, allRestaurants, displayedRestaurants.length, loadingMore]);

  const handleCategoryClick = useCallback((category) => {
    setFilter((currentFilter) => (currentFilter === category ? "" : category));
  }, []);

  useEffect(() => {
    const debouncedLoadMore = debounce(
      handleScrollForLoadingMore(loading, loadingMore, loadMoreRestaurants),
      300
    );
  
    window.addEventListener("scroll", debouncedLoadMore);
    return () => window.removeEventListener("scroll", debouncedLoadMore);
  }, [loading, loadingMore, loadMoreRestaurants]);

  const displayedFilteredRestaurants = filterRestaurants(
    displayedRestaurants,
    filter
  );

  return (
    <div className={styles.App}>
      <div className={styles.categoriesContainer}>
        {error && <div className={styles.errorMessage}>{error}</div>}
        {categoriesList.map((category) => (
          <button
            key={category}
            onClick={() => handleCategoryClick(category)}
            className={classNames(styles.categoryButton, {
              [styles.categoryButtonActive]: filter === category,
            })}
          >
            {category}
          </button>
        ))}
      </div>
      <div className={styles.resultsContainer}>
        {loading ? (
          <Loader />
        ) : displayedFilteredRestaurants.length > 0 ? (
          <div className={styles.cardsContainer}>
            {displayedFilteredRestaurants.map((restaurant) => (
              <Restaurant key={restaurant.id} restaurant={restaurant} />
            ))}
          </div>
        ) : (
          <div className={styles.noResults}>
            <span className={styles.alertIcon} role="img" aria-label="Alert">
              ⚠️
            </span>
            No restaurants found for {filter} category
          </div>
        )}
      </div>
      {loadingMore && (
        <div className={styles.loadingMore}>
          <span>.</span>
          <span>.</span>
          <span>.</span>
        </div>
      )}
    </div>
  );
}

export default App;
