import axios from "axios";

const API = "https://api.topheadlinesnews.com";

export const getShorts = async () => {
  try {
    const response = await axios.get(`${API}/api/shorts/list`);

    if (response.data.status) {
      return response.data.data;
    }

    return [];
  } catch (error) {
    console.log("Shorts API Error:", error);
    return [];
  }
};
