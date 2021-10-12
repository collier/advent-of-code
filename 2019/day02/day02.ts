import { readFileSync } from 'fs';

const input = readFileSync('./day02/day02-input.txt', 'utf-8');
const memory = input.split(',').map(n => parseInt(n));

function intcode(memory: number[], noun: number, verb: number): number {
  let memo = memory.slice();
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
  return memo[0];
}

const answer1 = intcode(memory, 12, 2);

let answer2: number | undefined;
for(let i = 0; i < 100; i++) {
  for(let j = 0; j < 100; j++) {
    if(intcode(memory, i, j) === 19690720) {
      answer2 = 100 * i + j;
      break;
    }
  }
  if(answer2) {
    break;
  }
}

console.log(`Answer 1: ${answer1}`); // 6568671
console.log(`Answer 2: ${answer2}`); // 3951
