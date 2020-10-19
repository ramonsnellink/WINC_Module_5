const jokeButtonEl = document.querySelector(".jokebutton");
const jokeContainerEl = document.querySelector(".joke");

jokeButtonEl.addEventListener("click", () => {
  getJoke().then((data) => renderJoke(data));
});

const getJoke = async () => {
  try {
    const result = await getData();
    console.log(result);
    return result;
  } catch (error) {
    console.log(error);
  }
};

const renderJoke = (dadjoke) => {
  jokeContainerEl.innerHTML = "";
  const jokeParagraphEl = document.createElement("p");
  const jokeImgEl = document.createElement("img");

  jokeParagraphEl.innerHTML = dadjoke.joke;
  jokeImgEl.src = `https://icanhazdadjoke.com/j/${dadjoke.id}.png`;

  jokeContainerEl.appendChild(jokeParagraphEl);
  jokeContainerEl.appendChild(jokeImgEl);

  return jokeContainerEl;
};
