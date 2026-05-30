import { toast } from "react-toastify";

export const removeFromWatchlist = (coinId) => {
  const watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
  const updatedWatchlist = watchlist.filter((id) => id !== coinId);
  localStorage.setItem("watchlist", JSON.stringify(updatedWatchlist));
  toast.success("Removed from Watchlist!", {
    position: "top-right",
    autoClose: 3000,
    theme: "dark",
  });
};