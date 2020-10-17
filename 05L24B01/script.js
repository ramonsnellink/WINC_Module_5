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

buttonSteenbokVrouwen.addEventListener("click", () => {
  renderCapricornList(getCapricornList());
});

buttonOudeCreditCards.addEventListener("click", () => {
  renderOldCreditcards(getOldCreditcards());
});

buttonMeesteMensen.addEventListener("click", () => {
  renderMostPeopleList(getMostPeoplePerCountry());
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
  resultsList.innerHTML = " ";

  countryList.map((listItem) => {
    const listItemElement = document.createElement("li");
    listItemElement.innerHTML = listItem;
    resultsList.appendChild(listItemElement);
    return listItemElement;
  });
};

//Steenbokvrouwen

const getCapricornList = () => {
  let capriCornList = randomPersonData
    .filter((person) => {
      const birthDate = new Date(person.birthday.raw * 1000);
      const birthMonth = birthDate.getMonth();
      const birthDay = birthDate.getDate();

      const checkCapriCorn = () => {
        if ((birthMonth === 0 && birthDay < 18) || (birthMonth === 11 && birthDay > 21)) {
          return true;
        }
      };
      return person.gender === "female" && person.age >= 30 && checkCapriCorn() === true;
    })
    .sort((a, b) => {
      const nameA = a.name.toLowerCase(); // ignore upper and lowercase
      const nameB = b.name.toLowerCase(); // ignore upper and lowercase

      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }

      // names must be equal
      return 0;
    });

  return capriCornList;
};

console.log(getCapricornList());

const renderCapricornList = (capricornList) => {
  resultsList.innerHTML = " ";

  capricornList.map((person) => {
    const listItemImage = document.createElement("img");
    const listItemElement = document.createElement("li");

    listItemImage.src = person.photo;

    listItemElement.innerHTML = `${person.name} ${person.surname}`;
    listItemElement.appendChild(listItemImage);
    resultsList.appendChild(listItemElement);
    return listItemElement;
  });
};

// Conver Credit Card String to a new Date
const convertCCtoDate = (datestring) => {
  const creditCardDateToString = datestring.credit_card.expiration.split("/");
  const creditCardDate = new Date(
    parseInt("20" + creditCardDateToString[1]),
    parseInt(creditCardDateToString[0])
  );
  return creditCardDate;
};

// Old CC's

const getOldCreditcards = () => {
  const now = new Date();
  const oldCreditcardList = randomPersonData
    .filter((person) => person.age >= 18)
    .filter((person) => {
      return (
        convertCCtoDate(person) > now &&
        convertCCtoDate(person).getFullYear() === now.getFullYear() + 1
      );
    })
    .sort((a, b) => {
      if (convertCCtoDate(a) < convertCCtoDate(b)) {
        return -1;
      }
      if (convertCCtoDate(a) > convertCCtoDate(b)) {
        return 1;
      }

      // names must be equal
      return 0;
    });
  return oldCreditcardList;
};

const renderOldCreditcards = (oldCreditcardList) => {
  resultsList.innerHTML = " ";

  oldCreditcardList.map((person) => {
    const listItemElement = document.createElement("li");
    listItemElement.innerHTML = `Name: ${person.name} ${person.surname}. Phone: ${person.phone}. Credit Card Number:${person.credit_card.number}. Expiration date: ${person.credit_card.expiration}`;
    resultsList.appendChild(listItemElement);
    return listItemElement;
  });
};

// Meeste mensen per land.

const getMostPeoplePerCountry = () => {
  const countryList = randomPersonData.map((person) => {
    return person.region;
  });

  const count = Array.from(
    countryList.reduce((unique, item) => unique.set(item, (unique.get(item) || 0) + 1), new Map()),
    ([country, count]) => ({ country, count })
  );

  count.sort((a, b) => {
    if (a.country < b.country) {
      return -1;
    }
    if (a.country > b.country) {
      return 1;
    }
    return 0;
  });
  return count;
};

const renderMostPeopleList = (mostPeoplePerCountry) => {
  resultsList.innerHTML = " ";

  mostPeoplePerCountry.map((listItem) => {
    const listItemElement = document.createElement("li");
    listItemElement.innerHTML = `${listItem.country}: ${listItem.count}`;
    resultsList.appendChild(listItemElement);
    return listItemElement;
  });
};

// Gemiddelde leeftijd

//Om die zin te kunnen laten zien moeten we de gemiddelde leeftijd voor dat land berekenen.

const getAvgAgeCountry = () => {
  const countryList = randomPersonData.map((countries) => countries.region);

  const countryListWithoutDoubles = [...new Set(countryList)];

  console.log(countryListWithoutDoubles);

  // maak filter op basis van de event value
  // const met length van die filter
  // const met alle ages opgeteld
  // const met avg berekend

  // bij de render:  countryButton.value = country;
};

console.log(getAvgAgeCountry());
