import { readFileSync } from 'fs';
import intcode from '../intcode.js';

const input = readFileSync('./day09/day09-input.txt', 'utf-8');
const initMemory = input.split(',').map(n => parseInt(n));

const { output: answer1 } = intcode({ initMemory, inputs: [1] });
const { output: answer2 } = intcode({ initMemory, inputs: [2] });

console.log(`Answer 1: ${answer1}`); // 2377080455
console.log(`Answer 2: ${answer2}`); // 74917