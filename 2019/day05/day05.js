import { readFileSync } from 'fs';

const input = readFileSync('./day05/day05-input.txt', 'utf-8');
const initMemory = input.split(',').map(n => parseInt(n));

// function intcode(initMemory) {
//   let memo = initMemory.slice();
//   let i = 0;
//   while(i < memo.length) {
//     const instructions = memo[i].toString();
//     const opcode = instructions.substring(instructions.length - 2);
//   }
// }

console.log(initMemory);