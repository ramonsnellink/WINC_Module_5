const buttonLandenlijst = document.querySelector(".landenlijst");
const buttonSteenbokVrouwen = document.querySelector(".steenbokvrouwen");
const buttonOudeCreditCards = document.querySelector(".oudecreditcards");
const buttonMeesteMensen = document.querySelector(".meestemensen");
const buttonGemiddeldeLeeftijd = document.querySelector(".gemiddeldeleeftijd");
const buttonMatchMaking = document.querySelector(".matchmaking");

const resultsList = document.querySelector(".results");

// buttonLandenlijst.addEventListener("click", () => {
//   console.log("Klik");
// });

// console.log(randomPersonData);
const getCountryList = () => {
  const countryList = randomPersonData.map((person) => person.region);

  const countryListWithoutDuplicates = countryList.reduce((unique, item) => {
    return unique.includes(item) ? unique : [...unique, item];
  }, []);

  const countryListSort = countryListWithoutDuplicates.sort();

  console.log(countryListSort);
};

getCountryList();
