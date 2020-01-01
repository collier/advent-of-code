import { readFileSync } from 'fs';

const input = readFileSync('./day02/day02-input.txt', 'utf-8');
const initMemory = input.split(',').map(massStr => parseInt(massStr));

function calc(initMemory, noun, verb) {
  let memo = initMemory.slice();
  memo[1] = noun;
  memo[2] = verb;
  for (let i = 0; i < memo.length; i += 4) {
    const opcode = memo[i];
    if (opcode === 99) {
      break;
    }
    if(opcode === 1) {
      memo[memo[i+3]] = memo[memo[i+1]] + memo[memo[i+2]];
    }
    if(opcode === 2) {
      memo[memo[i+3]] = memo[memo[i+1]] * memo[memo[i+2]];
    }
  }
  return [memo[0], memo[1], memo[2]];
}

const answer1 = calc(initMemory, 12, 2)[0];

let answer2;
for(let i = 0; i < 100; i++) {
  for(let j = 0; j < 100; j++) {
    const result = calc(initMemory, i, j);
    if(result[0] === 19690720) {
      answer2 = 100 * result[1] + result[2];
      break;
    }
  }
}

console.log(`Answer 1: ${answer1}`); // 6568671
console.log(`Answer 2: ${answer2}`); // 3951
