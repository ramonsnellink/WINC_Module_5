const buttonLandenlijst = document.querySelector(".landenlijst");
const buttonSteenbokVrouwen = document.querySelector(".steenbokvrouwen");
const buttonOudeCreditCards = document.querySelector(".oudecreditcards");
const buttonMeesteMensen = document.querySelector(".meestemensen");
const buttonGemiddeldeLeeftijd = document.querySelector(".gemiddeldeleeftijd");
const buttonMatchMaking = document.querySelector(".matchmaking");

const resultsList = document.querySelector(".results");

buttonLandenlijst.addEventListener("click", () => {
  renderCountryList(getCountryList());
});

// Maak een lijst van alle landen, gesorteerd op naam van het land.
const getCountryList = () => {
  const countryList = randomPersonData.map((person) => person.region);
  const countryListWithoutDuplicates = countryList.reduce((unique, item) => {
    if (unique.includes(item)) {
      return unique;
    } else {
      return [...unique, item];
    }
  }, []);

  return countryListWithoutDuplicates.sort();
};

const renderCountryList = (countryList) => {
  countryList.map((listItem) => {
    const listItemElement = document.createElement("li");
    listItemElement.innerHTML = listItem;
    resultsList.appendChild(listItemElement);
    return listItemElement;
  });
};

//Steenbokvrouwen

const getCapricornList = () => {
  const capriCornList = randomPersonData.filter((person) => {
    const birthDate = new Date(person.birthday.raw * 1000);
    const birthYear = birthDate.getFullYear();
    const birthMonth = birthDate.getMonth();
    const birthDay = birthDate.getDate();
    // console.log(birthMonth);
    // console.log(birthDay);

    const checkCapriCorn = () => {
      if ((birthMonth <= 0 && birthDay < 18) || (birthMonth >= 11 && birthDay > 21)) {
        return true;
      }
    };
    return person.gender === "female" && birthYear >= 1990 && checkCapriCorn() === true;
  });
  return capriCornList;
};

console.log(getCapricornList());
