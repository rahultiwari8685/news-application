import axios from "axios";

const api = axios.create({
  baseURL: "https://api.bharat19express.com/api",
});

export const getCategories = () => api.get("/categories/getAllCategory");

export const getAllTextNews = () => api.get("/news/getAllTextNews");

export const getNewsDetail = (slug) => api.get(`/news/slug/${slug}`);
