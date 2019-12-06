import { readFileLines } from '../util.js';

(async function() {
  const lines = await readFileLines('./day1/input.txt');
  const masses = lines.map(line => parseInt(line));

  function fuelCost(mass) {
    return Math.floor(mass / 3) - 2;
  }

  const answer1 = masses.reduce((sum, mass) => {
    return sum + fuelCost(mass);
  }, 0);

  console.log(`Answer 1 is: ${answer1}`);

  function fullFuelCost(mass) {
    const fuel = fuelCost(mass);
    if (fuelCost(fuel) > 0) {
      return fuel + fullFuelCost(fuel);
    } else {
      return fuel;
    }
  }

  const answer2 = masses.reduce((sum, mass) => {
    return sum + fullFuelCost(mass);
  }, 0);

  console.log(`Answer 2 is: ${answer2}`);
})();
