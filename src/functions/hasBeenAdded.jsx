export const hasBeenAdded = (coinId) => {
  const watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
  return watchlist.includes(coinId);
};