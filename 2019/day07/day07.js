import { readFileSync } from 'fs';
import intcode from '../day05/intcode.js';

const input = readFileSync('./day07/day07-input.txt', 'utf-8');
const initMemory = input.split(',').map(n => parseInt(n));

function amp(phase, inputSignal) {
  const memo = initMemory.slice();
  const { output } = intcode({
    initMemory: memo, 
    inputs: [phase, inputSignal]
  });
  return output;
}

function circuit(p) {
  return amp(p[4], amp(p[3], amp(p[2], amp(p[1], amp(p[0], 0)))));
}

function setInitialAmpState() {
  return { 
    a: { lastIndex: 0, lastMemory: initMemory.slice(), lastOutput: 0 },
    b: { lastIndex: 0, lastMemory: initMemory.slice(), lastOutput: 0 },
    c: { lastIndex: 0, lastMemory: initMemory.slice(), lastOutput: 0 },
    d: { lastIndex: 0, lastMemory: initMemory.slice(), lastOutput: 0 },
    e: { lastIndex: 0, lastMemory: initMemory.slice(), lastOutput: 0 }
  };
}
let ampState = setInitialAmpState();

function ampF(ampId, inputSignal, phase, loopCount) {
  const { lastIndex, lastMemory, lastOutput } = ampState[ampId];
  const inputs = loopCount === 0 ? [phase, inputSignal] : [inputSignal]; 
  const { output, index, opcode, memory } = intcode({
    initMemory: lastMemory, 
    inputs: inputs, 
    startingIndex: lastIndex, 
    stopOnFirstOutput: true
  });
  ampState[ampId] = { 
    lastIndex: index, 
    lastMemory: memory,
    lastOutput: output || lastOutput
  };
  const resultOutput = output ? output: lastOutput;
  return [resultOutput, opcode];
}

function circuitF(p) {
  let circuitInput = 0;
  let loopCount = 0;
  while(true) {
    const [ aOut ] = ampF('a', circuitInput, p[0], loopCount);
    const [ bOut ] = ampF('b', aOut, p[1], loopCount);
    const [ cOut ] = ampF('c', bOut, p[2], loopCount);
    const [ dOut ] = ampF('d', cOut, p[3], loopCount);
    const [ eOut, eOpcode ] = ampF('e', dOut, p[4], loopCount);
    if(eOpcode === '99') {
      ampState = setInitialAmpState();
      return eOut;
    } else {
      loopCount++;
      circuitInput = eOut;
    }
  }
}

function highestSignal(circuitFunc, phases) {
  let max = 0;
  const trackMax = (p) => {
    const output = circuitFunc(p);
    if(output > max) {
      max = output;
    }
  }
  for(let n0 = 0; n0 < 5; n0++) {
    const p0 = phases.slice();
    [p0[n0], p0[0]] = [p0[0], p0[n0]];
    trackMax(p0);
    for(let n1 = 0; n1 < 5; n1++) {
      if(n1 !== n0) {
        const p1 = p0.slice();
        [p1[n1], p1[1]] = [p1[1], p1[n1]];
        trackMax(p1);
        for(let n2 = 0; n2 < 5; n2++) {
          if(n2 !== n1 && n2 !== n1) {
            const p2 = p1.slice();
            [p2[n2], p2[2]] = [p2[2], p2[n2]];
            trackMax(p2);
            for(let n3 = 0; n3 < 5; n3++) {
              if(n3 !== n2 && n3 !== n2 && n3 !== n1) {
                const p3 = p2.slice();
                [p3[n3], p3[3]] = [p3[3], p3[n3]];
                trackMax(p3);
              }
            }
          }
        }
      }
    }
  }
  return max;
}

const answer1 = highestSignal(circuit, [0,1,2,3,4]);
const answer2 = highestSignal(circuitF, [5,6,7,8,9]);

console.log(`Answer 1: ${answer1}`); // 567045
console.log(`Answer 2: ${answer2}`); // 39016654

