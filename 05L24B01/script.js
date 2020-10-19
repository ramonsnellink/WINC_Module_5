const buttonLandenlijst = document.querySelector(".landenlijst");
const buttonSteenbokVrouwen = document.querySelector(".steenbokvrouwen");
const buttonOudeCreditCards = document.querySelector(".oudecreditcards");
const buttonMeesteMensen = document.querySelector(".meestemensen");
const buttonGemiddeldeLeeftijd = document.querySelector(".gemiddeldeleeftijd");
const buttonMatchMaking = document.querySelector(".matchmaking");

const resultSentence = document.querySelector(".results__sentence");

const resultsList = document.querySelector(".results");

buttonLandenlijst.addEventListener("click", () => {
  resultSentence.innerHTML = "";
  renderCountryList(getCountryList());
});

buttonSteenbokVrouwen.addEventListener("click", () => {
  resultSentence.innerHTML = "";
  renderCapricornList(getCapricornList());
});

buttonOudeCreditCards.addEventListener("click", () => {
  resultSentence.innerHTML = "";
  renderOldCreditcards(getOldCreditcards());
});

buttonMeesteMensen.addEventListener("click", () => {
  resultSentence.innerHTML = "";
  renderMostPeopleList(getMostPeoplePerCountry());
});

buttonGemiddeldeLeeftijd.addEventListener("click", () => {
  resultSentence.innerHTML = "";
  renderAvgAgeCountry(getAvgAgeCountry());
});

buttonMatchMaking.addEventListener("click", () => {
  resultSentence.innerHTML = "";
  renderZodiacList(getZodiacList());
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

const calculateAvgAge = (countryName) => {
  // Filter the total list to return only a list of people per country
  const filteredCountryList = randomPersonData.filter((person) => {
    return person.region.toLowerCase() === countryName.toLowerCase();
  });

  // Add all ages for that country together
  const accumulatedAgePerCountry = filteredCountryList.reduce((total, person) => {
    return (total += person.age);
  }, 0);

  const peoplePerCountry = filteredCountryList.length;
  //Divide the total age by the list length
  const avarageAge = Math.round(accumulatedAgePerCountry / peoplePerCountry);
  return avarageAge;
};

const getAvgAgeCountry = () => {
  const countryList = randomPersonData.map((countries) => {
    return { country: countries.region, avgage: calculateAvgAge(countries.region) }; // Calculate the avarage age and add it to the new object
  });

  // The code below I didn't invent myself: https://www.codementor.io/@nitinhepat/how-to-remove-duplicates-in-array-using-javascript-es6-15lc7px4g1#using-map
  const dataArr = countryList.map((item) => {
    return [item.country, item];
  }); // creates array of array

  const maparr = new Map(dataArr); // create key value pair from array of array
  const removedDuplicates = [...maparr.values()]; //converting back to array from mapobject
  return removedDuplicates;
};

const renderAvgAgeCountry = (avgAgeCountry) => {
  resultsList.innerHTML = " ";

  avgAgeCountry.map((listItem) => {
    const listItemElement = document.createElement("li");
    const buttonElement = document.createElement("button");

    buttonElement.innerHTML = listItem.country;

    resultsList.appendChild(listItemElement);
    listItemElement.appendChild(buttonElement);

    buttonElement.addEventListener("click", () => {
      resultSentence.innerHTML = `De gemiddelde persoon in ${listItem.country} is ${listItem.avgage} jaar oud`;
    });

    return listItemElement;
  });
};

const convertDateToZodiacSign = (month, day) => {
  if ((month == 1 && day <= 20) || (month == 12 && day >= 22)) {
    return "Steenbok";
  } else if ((month == 1 && day >= 21) || (month == 2 && day <= 18)) {
    return "Waterman";
  } else if ((month == 2 && day >= 19) || (month == 3 && day <= 20)) {
    return "Vissen";
  } else if ((month == 3 && day >= 21) || (month == 4 && day <= 20)) {
    return "Ram";
  } else if ((month == 4 && day >= 21) || (month == 5 && day <= 20)) {
    return "Stier";
  } else if ((month == 5 && day >= 21) || (month == 6 && day <= 20)) {
    return "Tweelingen";
  } else if ((month == 6 && day >= 21) || (month == 7 && day <= 22)) {
    return "Kreeft";
  } else if ((month == 7 && day >= 23) || (month == 8 && day <= 23)) {
    return "Leeuw";
  } else if ((month == 8 && day >= 24) || (month == 9 && day <= 23)) {
    return "Maagd";
  } else if ((month == 9 && day >= 24) || (month == 10 && day <= 23)) {
    return "Weegschaal";
  } else if ((month == 10 && day >= 24) || (month == 11 && day <= 22)) {
    return "Schorpioen";
  } else if ((month == 11 && day >= 23) || (month == 12 && day <= 21)) {
    return "Boogschutter";
  }
};

const whatIsPersonZodiac = (personName) => {
  const getIndividualPerson = randomPersonData
    .filter((person) => {
      return person.name.toLocaleLowerCase() === personName.toLowerCase();
    })
    .map((person) => {
      const birthDate = new Date(person.birthday.raw * 1000);
      const month = birthDate.getMonth();
      const day = birthDate.getDate();
      const zodiac = convertDateToZodiacSign(month, day);
      return zodiac;
    });

  return getIndividualPerson.join("");
};

const getZodiacList = () => {
  const zodiacList = randomPersonData
    .filter((person) => {
      return person.age >= 18;
    })
    .map((person) => {
      return {
        name: person.name,
        surname: person.surname,
        zodiac: whatIsPersonZodiac(person.name),
        photo: person.photo,
        region: person.region,
        age: person.age,
      };
    });

  return zodiacList;
};

const renderZodiacList = (zodiacList) => {
  resultsList.innerHTML = " ";

  zodiacList.map((person) => {
    const listItemImage = document.createElement("img");
    const listItemElement = document.createElement("li");
    const buttonElement = document.createElement("button");

    listItemImage.src = person.photo;
    buttonElement.innerHTML = "Vind Match";
    listItemElement.innerHTML = `Naam: ${person.name} ${person.surname}. Sterrenbeeld: ${person.zodiac}. Leeftijd: ${person.age}. Land: ${person.region}. Leeftijd: ${person.age} `;

    listItemElement.appendChild(buttonElement);
    listItemElement.appendChild(listItemImage);
    resultsList.appendChild(listItemElement);

    buttonElement.addEventListener("click", () => {
      const zodiacMatchList = findZodiacMatch(person);
      renderZodiacMatch(zodiacMatchList, person);
    });
    return listItemElement;
  });
};

const findZodiacMatch = (personToMatch) => {
  console.log(personToMatch);
  const findMatch = getZodiacList().filter((person) => {
    return personToMatch.zodiac === person.zodiac && personToMatch.name != person.name;
  });

  return findMatch;
};

const renderZodiacMatch = (zodiacMatches, person) => {
  resultsList.innerHTML = " ";
  resultSentence.innerHTML = `${person.name} matched met deze personen:`;

  zodiacMatches.map((person) => {
    const listItemImage = document.createElement("img");
    const listItemElement = document.createElement("li");
    const buttonElement = document.createElement("button");

    listItemImage.src = person.photo;
    buttonElement.innerHTML = "Vind Match";
    listItemElement.innerHTML = `Naam: ${person.name} ${person.surname}. Sterrenbeeld: ${person.zodiac}. Leeftijd: ${person.age}. Land: ${person.region}. Leeftijd: ${person.age} `;

    listItemElement.appendChild(buttonElement);
    listItemElement.appendChild(listItemImage);
    resultsList.appendChild(listItemElement);

    buttonElement.addEventListener("click", () => {
      const zodiacMatchList = findZodiacMatch(person);
      renderZodiacMatch(zodiacMatchList, person);
      resultSentence.innerHTML = `${person.name} matched met deze personen:`;
    });

    return listItemElement;

    // buttonElement.addEventListener("click", () => {
    //   resultSentence.innerHTML = `De gemiddelde persoon in ${listItem.country} is ${listItem.avgage} jaar oud`;
    // });
  });
};
