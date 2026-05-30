import React, { useEffect, useState } from "react";
import Header from "../components/common/header";
import TabsComponent from "../components/dashboard/Tabs";
import Search from "../components/dashboard/Search";
import PaginationComponent from "../components/dashboard/Pagination";
import Loader from "../components/common/Loader";
import BackToTop from "../components/common/BacktoTop";
import { get100coins } from "../functions/get100coins";


function DashBoardPage() {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState(""); 
  const [page, setPage] = useState(1);
  const [isLoading, setisLoading] = useState(true);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const onSearchChange = (e) => {
    setSearch(e.target.value);
  };

  var filteredCoins = coins.filter(
    (coin) =>
      coin.name.toLowerCase().includes(search.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(search.toLowerCase()),
  );

  const coinsPerPage = 10;

  const startIndex = (page - 1) * coinsPerPage;
  const endIndex = startIndex + coinsPerPage;

  const paginatedCoins = filteredCoins.slice(startIndex, endIndex);
  useEffect(() => {
    getData();
  }, []);
  
  const  getData = async()=>{
    const myCoins = await get100coins();
    if(myCoins){
    setCoins(myCoins);
    // setPaginatedCoins(myCoins.slice(0,100));
    setisLoading(false)
    }
   }
return (
  <>
    <Header />
  <BackToTop/>
    {isLoading ? (
      <Loader />
    ) : (
      <div>

        <Search
          search={search}
          onSearchChange={onSearchChange}
        />

        <TabsComponent
          coins={paginatedCoins}
        />

        <PaginationComponent
          page={page}
          handlePageChange={handlePageChange}
          count={Math.ceil(filteredCoins.length / coinsPerPage)}
        />

      </div>
    )}

  </>
);

}

export default DashBoardPage;
