export const fetchData = async (
  setAllRestaurants,
  setDisplayedRestaurants,
  INITIAL_ITEM_COUNT
) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/restaurants`);
    const data = await response.json();
    setAllRestaurants(data.businesses);
    setDisplayedRestaurants(data.businesses.slice(0, INITIAL_ITEM_COUNT));
  } catch (error) {
    console.error("Error fetching restaurants:", error);
  }
};

export const filterRestaurants = (restaurants, filter) => {
  return filter
    ? restaurants.filter((restaurant) =>
        restaurant.categories.some((category) => category.title === filter)
      )
    : restaurants;
};

export const handleScrollForLoadingMore =
  (loading, loadingMore, loadMoreRestaurants) => () => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.offsetHeight - 500 &&
      !loading &&
      !loadingMore
    ) {
      loadMoreRestaurants();
    }
  };

export const debounce = (func, wait, immediate = false) => {
  let timeout;
  return function() {
    const context = this, args = arguments;
    const later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (immediate && !timeout) func.apply(context, args);
  };
};
