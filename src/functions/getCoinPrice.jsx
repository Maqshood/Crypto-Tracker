import axios from "axios";

export const getCoinPrices = async (id, days, priceType) => {
  try {
    const response = await axios.get(
      `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=${days}&interval=daily`,
      {
        headers: {
        'x-cg-demo-api-key': import.meta.env.VITE_COINGECKO_API_KEY
        },
      },
    );
    console.log("Prices>>>", response.data[priceType]);
    return response.data[priceType];
  } catch (error) {
    console.log("ERROR", error.message);
    return [];
  }
};
