export const getWatchlist = () => {
  return JSON.parse(localStorage.getItem("watchlist")) || [];
};