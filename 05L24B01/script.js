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
  const capriCornList = randomPersonData.filter((person) => {
    const birthDate = new Date(person.birthday.raw * 1000);
    const birthMonth = birthDate.getMonth();
    const birthDay = birthDate.getDate();

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

console.log(getCapricornList());

// Old CC's

const getOldCreditcards = () => {
  const now = new Date();

  const oldCreditcardList = randomPersonData
    .filter((person) => person.age >= 18)
    .filter((person) => {
      // split eerst de string (is bijv 11/21). Dan omzetten in nieuwe datum (zet om naar getal)
      const creditCardDateString = person.credit_card.expiration.split("/");
      const creditCardDate = new Date(
        parseInt("20" + creditCardDateString[1]),
        parseInt(creditCardDateString[0])
      );
      return creditCardDate > now && creditCardDate.getFullYear() === now.getFullYear() + 1;
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
  const countryList = randomPersonData.map((person) => ({ region: person.region }));

  //https://stackoverflow.com/questions/37365512/count-the-number-of-times-a-same-value-appears-in-a-javascript-array
  //   function getOccurrence(array, value) {
  //     return array.filter((v) => (v === value)).length;
  // }

  // console.log(getOccurrence(arr, 1));  // 2
  // console.log(getOccurrence(arr, 3));  // 3

  

  const countryListWithoutDuplicates = countryList.reduce((unique, item) => {
    if (unique.includes(item)) {
      return unique;
    } else {
      return [...unique, item];
    }
  }, []);

  return countryListWithoutDuplicates.sort();
};

console.log(getMostPeoplePerCountry());

// const renderMostPeoplePerCountryList = (mostPeoplePerCountry) => {
//   resultsList.innerHTML = " ";

//   countryList.map((listItem) => {
//     const listItemElement = document.createElement("li");
//     listItemElement.innerHTML = listItem;
//     resultsList.appendChild(listItemElement);
//     return listItemElement;
//   });
// };
