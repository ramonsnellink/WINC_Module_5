const API_KEY = "";

const getData = async () => {
  const apiUrl = `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`;
  try {
    const res = await fetch(apiUrl, { method: "GET" }).then((response) => response.json());
    console.log(res);
  } catch (error) {
    console.log(error);
  }
};
