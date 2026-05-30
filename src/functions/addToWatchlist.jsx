import { toast } from "react-toastify";

export const addToWatchlist = (coinId) => {
  const watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
  watchlist.push(coinId);
  localStorage.setItem("watchlist", JSON.stringify(watchlist));
  toast.success("Added to Watchlist!", {
    position: "top-right",
    autoClose: 3000,
    theme: "dark",
  });
};