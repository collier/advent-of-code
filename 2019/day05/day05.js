import { readFileSync } from 'fs';
import intcode from '../intcode.js';

const input = readFileSync('./day05/day05-input.txt', 'utf-8');
const initMemory = input.split(',').map(n => parseInt(n));

const { output: answer1 } = intcode({
  initMemory, 
  inputs: [1]
});
const { output: answer2 } = intcode({
  initMemory, 
  inputs: [5]
});

console.log(`Answer 1: ${answer1}`); // 3122865
console.log(`Answer 2: ${answer2}`); // 773660