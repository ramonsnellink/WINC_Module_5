const huiswerkMaken = (vak, callback) => {
  setTimeout(() => {
    console.log(`Ok ik ga nu mijn ${vak} huiswerk maken.`);
    callback();
  }, 2000);
};

const klaarMetHuiswerk = () => {
  console.log("Kijk mam/pap, ik ben klaar met huiswerk!");
};

huiswerkMaken("wiskunde", klaarMetHuiswerk);
