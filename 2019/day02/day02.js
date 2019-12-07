import { readFileSync } from 'fs';

const data = readFileSync('./day02-input.txt', 'utf-8');
let initMemory = data.split(',').map(massStr => parseInt(massStr));

function calc(initMemory, noun, verb) {
  let memory = initMemory.slice();
  memory[1] = noun;
  memory[2] = verb;
  for (let i = 0; i < memory.length; i += 4) {
    const opcode = memory[i];
    if (opcode === 99) {
      break;
    }
    if(opcode === 1) {
      memory[memory[i+3]] = memory[memory[i+1]] + memory[memory[i+2]];
    }
    if(opcode === 2) {
      memory[memory[i+3]] = memory[memory[i+1]] * memory[memory[i+2]];
    }
  }
  return [memory[0], memory[1], memory[2]];
}

const answer1 = calc(initMemory, 12, 2)[0];

console.log(`Answer 1 is: ${answer1}`);

for(let i = 0; i < 100; i++) {
  for(let j = 0; j < 100; j++) {
    const result = calc(initMemory, i, j);
    if(result[0] === 19690720) {
      const answer2 = 100 * result[1] + result[2];
      console.log(`Answer 2 is: ${answer2}`);
      break;
    }
  }
}
