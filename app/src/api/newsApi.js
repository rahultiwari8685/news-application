import axios from "axios";

const BASE_URL = "https://api.bharat19express.com/api";

export const getLiveStatus = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/news/live`);

    return response.data;
  } catch (error) {
    console.log("Live API Error", error.message);
    return null;
  }
};

export const getBreakingNews = async () => {
  const res = await axios.get(`${BASE_URL}/news/trending?limit=10`);

  return res.data;
};
