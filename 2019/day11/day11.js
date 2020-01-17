import { readFileSync } from 'fs';
import intcode from '../intcode';

const input = readFileSync('./day11/day11-input.txt', 'utf-8');
const initMemory = input.split(',').map(n => parseInt(n));

console.log(initMemory);