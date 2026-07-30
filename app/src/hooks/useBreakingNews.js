// hooks/useBreakingNews.js

import { useEffect, useState } from "react";
import { getBreakingNews } from "../api/newsApi";

export default function useBreakingNews() {
  const [news, setNews] = useState([]);

  const load = async () => {
    try {
      const res = await getBreakingNews();

      if (res.status) {
        setNews(res.data);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    load();

    const interval = setInterval(load, 60000);

    return () => clearInterval(interval);
  }, []);

  return news;
}
