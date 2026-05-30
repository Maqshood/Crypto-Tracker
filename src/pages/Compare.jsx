/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import Header from "../components/common/header";
import SelectCoins from "../components/compare/SelectCoins";
import SelectDays from "../components/coin/SelectDays";
import { coinObject } from "../functions/convertObject";
// eslint-disable-next-line no-unused-vars
import { settingChartData } from "../functions/settingChartData";
import { getCoinPrices } from "../functions/getCoinPrice";
import { getCoinData } from "../functions/getCoinData";
import Loader from "../components/common/Loader";
import List from "../components/dashboard/List";
import CoinInfo from "../components/coin/CoinInfo";
import LineChart from "../components/coin/LineChart";
import TogglePriceType from "../components/coin/PriceType";
function ComparePage() {
  const [crypto1, setCrypto1] = useState("bitcoin");
  const [crypto2, setCrypto2] = useState("ethereum");
  const [crypto1Data, setCrypto1Data] = useState({});
  const [crypto2Data, setCrypto2Data] = useState({});
  const [isLoading, setisLoading] = useState(true);
  const [days, setDays] = useState(30);
  // eslint-disable-next-line no-unused-vars
  const [priceType, setPriceType] = useState("prices");
  const [chartData, setChartData] = useState({});

  async function handleDaysChange(event) {
    setisLoading(true);
    setDays(event.target.value);
    const prices1 = await getCoinPrices(crypto1, event.target.value, priceType);
    const prices2 = await getCoinPrices(crypto2, event.target.value, priceType);
    settingChartData(setChartData, prices1, prices2);
    setisLoading(false);
  }

  const handlePriceTypeChange = async (event, newType) => {
    if (!newType || newType === priceType) return; 
    setPriceType(newType);
    setisLoading(true);
    const prices1 = await getCoinPrices(crypto1, days, newType);
    const prices2 = await getCoinPrices(crypto2, days, newType );
    settingChartData(setChartData, prices1, prices2);
    setisLoading(false);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/immutability
    getData();
  }, []);

  async function getData() {
    setisLoading(true);
    const data1 = await getCoinData(crypto1);
    const data2 = await getCoinData(crypto2);
    if (data1) {
      coinObject(setCrypto1Data, data1);
    }
    if (data2) {
      coinObject(setCrypto2Data, data2);
    }

    if (data1 && data2) {
      const prices1 = await getCoinPrices(crypto1, days, priceType);
      const prices2 = await getCoinPrices(crypto2, days, priceType);
      if (prices1.length > 0 && prices2.length > 0) {
        settingChartData(setChartData, prices1, prices2);
        console.log("BOTH PRICES FETCHED", prices1, prices2);

        setisLoading(false);
      }
    }
  }

  const handleCoinChange = async (event, isCoin2) => {
  setisLoading(true);
  const selectedCoin = event.target.value; // ✅ store value immediately

  if (isCoin2) {
    setCrypto2(selectedCoin);
    const data = await getCoinData(selectedCoin);
    if (!data) { setisLoading(false); return; }
    coinObject(setCrypto2Data, data);

    const prices1 = await getCoinPrices(crypto1, days, priceType);
    const prices2 = await getCoinPrices(selectedCoin, days, priceType); // ✅ use selectedCoin not crypto2
    if (prices1.length > 0 && prices2.length > 0) {
      settingChartData(setChartData, prices1, prices2); // ✅ update chart
      setisLoading(false);
    }
  } else {
    setCrypto1(selectedCoin);
    const data = await getCoinData(selectedCoin);
    if (!data) { setisLoading(false); return; }
    coinObject(setCrypto1Data, data);

    const prices1 = await getCoinPrices(selectedCoin, days, priceType); // ✅ use selectedCoin not crypto1
    const prices2 = await getCoinPrices(crypto2, days, priceType);
    if (prices1.length > 0 && prices2.length > 0) {
      settingChartData(setChartData, prices1, prices2); // ✅ update chart
      setisLoading(false); // ✅ was missing!
    }
  }
};

  return (
    <div>
      <Header />
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className="coins-days-flex">
            <SelectCoins
              crypto1={crypto1}
              handleCoinChange={handleCoinChange}
              crypto2={crypto2}
            />
            <SelectDays
              days={days}
              handleDaysChange={handleDaysChange}
              noPTag={true}
            />
          </div>
          <div className="grey-wrapper" style={{ padding: "0rem 1rem" }}>
            <List coin={crypto1Data} />
          </div>

          <div className="grey-wrapper" style={{ padding: "0rem 1rem" }}>
            <List coin={crypto2Data} />
          </div>
          <div className="grey-wrapper">
            <div style={{ display: "flex", justifyContent: "center", marginBottom: "1.5rem" }}></div>
            <TogglePriceType
              priceType={priceType}
              handlePriceTypeChange={handlePriceTypeChange}
              
            />
            <LineChart
              chartData={chartData}
              priceType={priceType}
              multiAxis={true}
            />
          </div>

          <CoinInfo heading={crypto1Data.name} desc={crypto1Data.desc} />
          <CoinInfo heading={crypto2Data.name} desc={crypto2Data.desc} />
        </>
      )}
    </div>
  );
}

export default ComparePage;
