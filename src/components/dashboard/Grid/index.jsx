import React, { useState } from "react";
import "./styles.css";
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";
import TrendingDownRoundedIcon from "@mui/icons-material/TrendingDownRounded";
import { Link } from "react-router-dom";
import { addToWatchlist } from "../../../functions/addToWatchlist";
import { removeFromWatchlist } from "../../../functions/removeFromWatchlist";
import { hasBeenAdded } from "../../../functions/hasBeenAdded";
import BookmarkAddRoundedIcon from "@mui/icons-material/BookmarkAddRounded";
import BookmarkRemoveRoundedIcon from "@mui/icons-material/BookmarkRemoveRounded";
import Tooltip from "@mui/material/Tooltip";

function Grid({ coin, handleRemove }) { // ✅ accept handleRemove
  const [isAdded, setIsAdded] = useState(hasBeenAdded(coin.id));

  const handleWatchlistClick = (e) => {
    e.preventDefault();
    if (isAdded) {
      if (handleRemove) handleRemove(coin.id); // ✅ use parent handler if on watchlist page
      else removeFromWatchlist(coin.id);       // ✅ fallback for dashboard page
      setIsAdded(false);
    } else {
      addToWatchlist(coin.id);
      setIsAdded(true);
    }
  };

  return (
    <Link to={`/coin/${coin.id}`} className="grid-link">
      <div className={`grid-container ${coin.price_change_percentage_24h < 0 && "grid-container-red"}`}>
        <div className="info-flex">
          <img src={coin.image} alt="coin" className="coin-logo" />
          <div className="name-col">
            <p className="coin-symbol">{coin.symbol}</p>
            <p className="coin-name">{coin.name}</p>
          </div>
          <Tooltip title={isAdded ? "Remove from Watchlist" : "Add to Watchlist"}>
            <div onClick={handleWatchlistClick} className="watchlist-icon-container">
              {isAdded ? (
                <BookmarkRemoveRoundedIcon className="watchlist-icon red" />
              ) : (
                <BookmarkAddRoundedIcon className="watchlist-icon" />
              )}
            </div>
          </Tooltip>
        </div>

        {coin.market_cap_change_percentage_24h > 0 ? (
          <div className="chip-flex">
            <div className="price-chip">
              {coin.market_cap_change_percentage_24h.toFixed(2)}%
            </div>
            <div className="icon-chip">
              <TrendingUpRoundedIcon />
            </div>
          </div>
        ) : (
          <div className="chip-flex">
            <div className="price-chip chip-red">
              {coin.market_cap_change_percentage_24h.toFixed(2)}%
            </div>
            <div className="icon-chip chip-red">
              <TrendingDownRoundedIcon />
            </div>
          </div>
        )}

        <div className="info-contanier">
          <h3
            className="coin-price"
            style={{
              color: coin.market_cap_change_percentage_24h < 0
                ? "var(--red)"
                : "var(--green)",
            }}
          >
            ${coin.current_price.toLocaleString()}
          </h3>
          <p className="total-volume">Total Volume: {coin.total_volume.toLocaleString()}</p>
          <p className="total-volume">Market Cap: {coin.market_cap.toLocaleString()}</p>
        </div>
      </div>
    </Link>
  );
}

export default Grid;