import axios from "axios";

export const getCoinData = async (id) => {
  try {
    const response = await axios.get(
      `https://api.coingecko.com/api/v3/coins/${id}`,
      {
        headers: {
          'x-cg-demo-api-key': import.meta.env.VITE_COINGECKO_API_KEY
        },
      },
    );
    return response.data;
  } catch (error) {
    console.log("ERROR", error.message);
    return null;
  }
};
