import { readFileSync } from 'fs';
import intcode from '../day05/intcode.js';

// const input = readFileSync('./day07/day07-input.txt', 'utf-8');
const input = '3,15,3,16,1002,16,10,16,1,16,15,15,4,15,99,0,0';
// const input = '3,23,3,24,1002,24,10,24,1002,23,-1,23,101,5,23,23,1,24,23,23,4,23,99,0,0';
// const input = '3,31,3,32,1002,32,10,32,1001,31,-2,31,1007,31,0,33,1002,33,7,33,1,33,31,31,1,32,31,31,4,31,99,0,0,0';
const initMemory = input.split(',').map(n => parseInt(n));


function amp(phase, inputSignal) {
  const memo = initMemory.slice();
  return intcode(memo, [phase, inputSignal]);
}

const phases = [0,1,2,3,4];
let max = 0;
for(let i = 0; i < phases.length; i++) {
  const p = phases.slice();
  [p[i], p[0]] = [p[0], p[i]];
  for(let j = 0; j < p.length; j++) {
    for(let k = 0; k < p.length; k++) {
      console.log(p);
      const output = amp(p[4], amp(p[3], amp(p[2], amp(p[1], amp(p[0], 0)))));
      if(output > max) {
        max = output;
      }
      if(j !== k && j !== i && k !== i) {
        [p[j], p[k]] = [p[k], p[j]];
      }
    }
  }
}
// const maxOutput = Math.max(...outputs);

console.log(max); // 567015 too low