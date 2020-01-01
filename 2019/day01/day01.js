import { readFileSync } from 'fs';

const input = readFileSync('./day01/day01-input.txt', 'utf-8');
const masses = input.split('\r\n').map(massStr => parseInt(massStr));

function fuelCost(mass) {
  return Math.floor(mass / 3) - 2;
}

const answer1 = masses.reduce((sum, mass) => {
  return sum + fuelCost(mass);
}, 0);

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

console.log(`Answer 1: ${answer1}`); //3315133
console.log(`Answer 2: ${answer2}`); //4969831
