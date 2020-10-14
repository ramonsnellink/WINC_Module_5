const API_KEY = "";

const getData = async (endpoint) => {
  const apiUrl = `https://api.themoviedb.org${endpoint}`;

  try {
    const res = await fetch(apiUrl, { method: "GET" });
    const data = await res.json();

    return data;
  } catch (error) {
    console.log(error);
  }
};
