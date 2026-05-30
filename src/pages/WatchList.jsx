import React, { useEffect, useState } from "react";
import Header from "../components/common/header";
import TabsComponent from "../components/dashboard/Tabs";
import Search from "../components/dashboard/Search";
import Loader from "../components/common/Loader";
import BackToTop from "../components/common/BacktoTop";
import { get100coins } from "../functions/get100coins";
import { getWatchlist } from "../functions/getWatchlist";
import { removeFromWatchlist } from "../functions/removeFromWatchlist";

function WatchListPage() {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const onSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const filteredCoins = coins.filter(
    (coin) =>
      coin.name.toLowerCase().includes(search.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(search.toLowerCase()),
  );

  useEffect(() => {
    // eslint-disable-next-line react-hooks/immutability
    getData();
  }, []);

  const getData = async () => {
    const watchlist = getWatchlist();
    const allCoins = await get100coins();
    if (allCoins) {
      const watchlistCoins = allCoins.filter((coin) =>
        watchlist.includes(coin.id),
      );
      setCoins(watchlistCoins);
      setIsLoading(false);
    }
  };
  const handleRemove = (coinId) => {
    removeFromWatchlist(coinId);
    setCoins((prev) => prev.filter((coin) => coin.id !== coinId));
  };

  return (
    <>
      <Header />
      <BackToTop />
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          {coins.length === 0 ? (
            <div
              style={{ textAlign: "center", marginTop: "5rem", color: "grey" }}
            >
              <h2>Your watchlist is empty!</h2>
              <p>Add coins from the dashboard to track them here.</p>
            </div>
          ) : (
            <>
              <Search search={search} onSearchChange={onSearchChange} />
               <TabsComponent coins={filteredCoins} handleRemove={handleRemove} />
            </>
          )}
        </div>
      )}
    </>
  );
}

export default WatchListPage;
