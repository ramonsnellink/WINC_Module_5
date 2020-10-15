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
    const birthMonth = birthDate.getMonth();
    const birthDay = birthDate.getDate();
    // console.log(birthMonth);
    // console.log(birthDay);

    // aparte filter per ding... dus eerst filter voor gender, dan
    const checkCapriCorn = () => {
      if ((birthMonth === 0 && birthDay < 18) || (birthMonth === 11 && birthDay > 21)) {
        return true;
      }
    };
    return person.gender === "female" && person.age >= 30 && checkCapriCorn() === true;
  });
  return capriCornList;
};

const renderCapricornList = (capricornList) => {
  capricornList.map((person) => {
    // const listItemElement = document.createElement("li");
    // listItemElement.innerHTML = listItem;
    // resultsList.appendChild(listItemElement);
    // return listItemElement;
  });
};

console.log(getCapricornList());
