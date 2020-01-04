import { readFileSync } from 'fs';

const input = readFileSync('./day05/day05-input.txt', 'utf-8');
const initMemory = input.split(',').map(n => parseInt(n));

function intcode(initMemory, input) {
  let memo = initMemory.slice();
  let i = 0;
  let lastOutput;
  while(i < memo.length) {
    const instructions = memo[i].toString();
    let opcode = instructions.substring(instructions.length - 2);
    let modes = instructions.substring(0, instructions.length - 2);
    opcode = opcode.length === 1 ? '0' + opcode : opcode;
    if(modes.length === 0) {
      modes = '00';
    }
    if(modes.length === 1) {
      modes = '0' + modes;
    }
    const param1 = modes[1] === '1' ? memo[i+1] : memo[memo[i+1]];
    const param2 = modes[0] === '1' ? memo[i+2] : memo[memo[i+2]];
    if(opcode === '01') { // addition
      memo[memo[i+3]] = param1 + param2;
      i += 4;
    } else if(opcode === '02') { // multiply
      memo[memo[i+3]] = param1 * param2;
      i += 4;
    } else if(opcode === '03') { // input update
      memo[memo[i+1]] = input;
      i += 2;
    } else if(opcode === '04') { // output
      console.log(`Output: ${param1}`);
      lastOutput = param1;
      i += 2;
    } else if(opcode === '05') { // jump-if-true
      if(param1 !== 0) {
        i = param2;
      } else {
        i += 3;
      }
    } else if(opcode === '06') { // jump-if-false
      if(param1 === 0) {
        i = param2;
      } else {
        i += 3;
      }
    } else if(opcode === '07') { // less than
      memo[memo[i+3]] = param1 < param2 ? 1 : 0;
      i += 4;
    } else if(opcode === '08') { // equals
      memo[memo[i+3]] = param1 === param2 ? 1 : 0;
      i += 4;
    } else if(opcode === '99') {
      break;
    }
  }
  return lastOutput;
}

const answer1 = intcode(initMemory, 1);
const answer2 = intcode(initMemory, 5);

console.log(`Answer 1: ${answer1}`); // 3122865
console.log(`Answer 2: ${answer2}`); // 773660