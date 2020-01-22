import { readFileSync } from 'fs';

const input = readFileSync('./day11/day11-input.txt', 'utf-8');
const memory = input.split(',').map(n => parseInt(n));

console.log(memory);