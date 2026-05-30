import axios from "axios";

export const get100coins = async () => {
  try {
    const response = await axios.get(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&per_page=100&page=1&sparkline=false",
      {
        headers: {
          'x-cg-demo-api-key': import.meta.env.VITE_COINGECKO_API_KEY
        },
      },
    );
    console.log("RESPONSE>>", response.data);
    return response.data;
  } catch (error) {
    console.log("ERROR", error.message);
    return []; 
  }
};
