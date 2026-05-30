/* eslint-disable react-hooks/immutability */
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/common/header";
import Loader from "../components/common/Loader";
import { coinObject } from "../functions/convertObject";
import List from "../components/dashboard/List";
import CoinInfo from "../components/coin/CoinInfo";
import { getCoinData } from "../functions/getCoinData";
import { getCoinPrices } from "../functions/getCoinPrice";
import LineChart from "../components/coin/LineChart";
// eslint-disable-next-line no-unused-vars
import { convertDate } from "../functions/convertDate";
import SelectDays from "../components/coin/SelectDays";
import { settingChartData } from "../functions/settingChartData";
import TogglePriceType from "../components/coin/PriceType";

function CoinPage() {
  const { id } = useParams();
  const [isLoading, setisLoading] = useState(true);
  const [coinData, setCoinData] = useState();
  const [days, setDays] = useState(30);
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });
  const [priceType, setPriceType] = useState("prices");

  useEffect(() => {
    if (id) {
      getData();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  async function getData() {
    setisLoading(true);
    const data = await getCoinData(id);
    if (data) {
      coinObject(setCoinData, data);
      const prices = await getCoinPrices(id, days, priceType);
      if (prices.length > 0) {
        settingChartData(setChartData, prices);
        setisLoading(false);
      }
    }
  }

  const handleDaysChange = async (event) => {
    setisLoading(true);
    setDays(Number(event.target.value));
    const prices = await getCoinPrices(
      id,
      Number(event.target.value),
      priceType,
    );
    if (prices.length > 0) {
      settingChartData(setChartData, prices);
      setisLoading(false);
    }
  };

  const handlePriceTypeChange = async (event, newType) => {
    if (!newType || newType === priceType) return; 
    setPriceType(newType);
    setisLoading(true);
    const prices = await getCoinPrices(id, days, newType);
    if (prices.length > 0) {
      settingChartData(setChartData, prices);
      setisLoading(false);
    }
  };

  return (
    <div>
      <Header />
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className="grey-wrapper">
            <List coin={coinData} />
          </div>
          <div className="grey-wrapper">
            <SelectDays days={days} handleDaysChange={handleDaysChange} />
            <TogglePriceType
              priceType={priceType}
              handlePriceTypeChange={handlePriceTypeChange}
            />
            <LineChart chartData={chartData} priceType={priceType} />
          </div>
          <CoinInfo heading={coinData.name} desc={coinData.desc} />
        </>
      )}
    </div>
  );
}

export default CoinPage;
