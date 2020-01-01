import { readFileSync } from 'fs';

const data = readFileSync('./day05/day05-input.txt', 'utf-8');
const input = data.split(',').map(n => parseInt(n));
