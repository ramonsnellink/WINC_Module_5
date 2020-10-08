const optellenRest = (...numbers) => {
  return numbers.reduce((total, num) => {
    return (total += num);
  });
};

console.log(optellenRest(1, 2, 3, 4, 5, 6, 7, 100));

const optellenSpread = (num1, num2, num3) => {
  return num1 + num2 + num3;
};

const cijfers = [4, 100, 9];
console.log(optellenSpread(...cijfers));
