import React, { useState } from "react";
import "./styles.css";
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";
import TrendingDownRoundedIcon from "@mui/icons-material/TrendingDownRounded";
import Tooltip from "@mui/material/Tooltip";
import { convertNumber } from "../../../functions/convertNumber";
import { useNavigate } from "react-router-dom";
import { addToWatchlist } from "../../../functions/addToWatchlist";
import { removeFromWatchlist } from "../../../functions/removeFromWatchlist";
import { hasBeenAdded } from "../../../functions/hasBeenAdded";
import BookmarkAddRoundedIcon from "@mui/icons-material/BookmarkAddRounded";
import BookmarkRemoveRoundedIcon from "@mui/icons-material/BookmarkRemoveRounded";

function List({ coin, handleRemove }) { // ✅ accept handleRemove
  const navigate = useNavigate();
  const [isAdded, setIsAdded] = useState(hasBeenAdded(coin.id));

  const handleWatchlistClick = (e) => {
    e.stopPropagation();
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
    <tr className="List-row" onClick={() => navigate(`/coin/${coin.id}`)}>
      <Tooltip title="Coin Logo">
        <td className="td-image">
          <img src={coin.image} alt="coin" className="coin-logo" />
        </td>
      </Tooltip>
      <Tooltip title="Coin Info" placement="bottom-start">
        <td>
          <div className="name-col">
            <p className="coin-symbol">{coin.symbol}</p>
            <p className="coin-name">{coin.name}</p>
          </div>
        </td>
      </Tooltip>
      <Tooltip title="Price Change IN 24Hrs" placement="bottom-start">
        {coin.market_cap_change_percentage_24h > 0 ? (
          <td className="chip-flex">
            <div className="price-chip">
              {coin.market_cap_change_percentage_24h?.toFixed(2) || "0.00"}%
            </div>
            <div className="icon-chip td-icon">
              <TrendingUpRoundedIcon />
            </div>
          </td>
        ) : (
          <td className="chip-flex">
            <div className="price-chip chip-red">
              {coin.market_cap_change_percentage_24h?.toFixed(2) || "0.00"}%
            </div>
            <div className="icon-chip chip-red td-icon">
              <TrendingDownRoundedIcon />
            </div>
          </td>
        )}
      </Tooltip>
      <Tooltip title="Current Price">
        <td>
          <h3
            className="coin-price td-center-align"
            style={{
              color: coin.market_cap_change_percentage_24h < 0
                ? "var(--red)"
                : "var(--green)",
            }}
          >
            ${coin.current_price?.toLocaleString()}
          </h3>
        </td>
      </Tooltip>
      <Tooltip title="Total Volume" placement="bottom">
        <td>
          <p className="total-volume td-right-align td-total-volume">
            {coin.total_volume?.toLocaleString()}
          </p>
        </td>
      </Tooltip>
      <Tooltip title="Market Cap" placement="bottom">
        <td className="desktop-td-mkt">
          <p className="total-volume td-right-align">
            {coin.market_cap?.toLocaleString()}
          </p>
        </td>
      </Tooltip>
      <Tooltip title="Market Cap" placement="bottom">
        <td className="mobile-td-mkt">
          <p className="total-volume td-right-align">
            {convertNumber(coin.market_cap)}
          </p>
        </td>
      </Tooltip>
      <Tooltip title={isAdded ? "Remove from Watchlist" : "Add to Watchlist"}>
        <td onClick={handleWatchlistClick}>
          {isAdded ? (
            <BookmarkRemoveRoundedIcon className="watchlist-icon red" />
          ) : (
            <BookmarkAddRoundedIcon className="watchlist-icon" />
          )}
        </td>
      </Tooltip>
    </tr>
  );
}

export default List;