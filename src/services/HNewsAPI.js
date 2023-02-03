import axios from "axios";

// axios.defaults.baseURL = process.env.REACT_APP_API_URL;

axios.defaults.baseURL = "http://hn.algolia.com/api/v1/";

export const getArticles = async (params = {}) => {
  const response = await axios.get("search", { params });
  return response.data.hits;
};

const URL = "http://hn.algolia.com/api/v1/";

export const fetchArticles = async (params = {}) => {
  const query = new URLSearchParams();
  Object.entries(params).forEach((param) => query.append(param[0], param[1]));
  const response = await fetch(
    // `${process.env.REACT_APP_API_URL}search?${query}`,
    `${URL}search?${query}`,

    {
      method: "GET",
    }
  );
  const data = await response.json();
  return data.hits;
};
