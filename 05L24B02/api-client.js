
const getData = async () => {
  const apiUrl = "https://icanhazdadjoke.com";

  try {
    const res = await fetch(apiUrl, {
      method: "GET",
      headers: {
        accept: "application/json",
      },
    });
    const data = await res.json();

    return data;
  } catch (error) {
    console.log(error);
  }
};


// GET https://icanhazdadjoke.com/j/<joke_id>.png

