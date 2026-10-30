import axios from "axios";

const api = axios.create({
  baseURL: "https://api.bharat19express.com/api",
});

export const getCategories = () => api.get("/categories/getAllCategory");

export const getAllNews = () => api.get("/news/getAllNews");

export const getNewsDetail = (slug) => api.get(`/news/slug/${slug}`);
