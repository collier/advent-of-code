import { readFileSync } from 'fs';

const input = readFileSync('./day05/day05-input.txt', 'utf-8');
const initMemory = input.split(',').map(n => parseInt(n));

function intcode(initMemory) {
  let memo = initMemory.slice();
  let i = 0;
  while(i < memo.length) {
    const instructions = memo[i].toString();
    let opcode = instructions.substring(instructions.length - 2);
    const modes = instructions.substring(0, instructions.length - 2);
    console.log(instructions);
    opcode = opcode.length === 1 ? '0' + opcode : opcode;
    if(opcode === '01') { // addition
      i += 4;
    } else if(opcode === '02') { // multiply
      i += 4;
    } else if(opcode === '03') { // input update
      i += 2;
    } else if(opcode === '04') { // output
      i += 2;
    } else if(opcode === '99') {
      i+= 1;
    }
  }
}

intcode(initMemory);