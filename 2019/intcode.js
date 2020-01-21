/**
 * Modifies an array beyond its original length by filling missing entries with
 * zeros.
 * @param {number[]} arr - The array that will be expanded.
 * @param {number} index - The index to which arr should be filled with zeros.
 */
function fillZeros(arr, i) {
  if(i >= arr.length) {
    const count = i - arr.length + 1;
    arr.push(...new Array(count).fill(0));
  }
}

/**
 * @typedef {Object} IntcodeResult
 * @property {number} output - The last output of the intcode program
 * @property {number} index - The last index of the intcode program
 * @property {string} lastOpcode - The last opcode used by the intcode program
 * @property {number[]} memory - Dump of the intcode program memory at time of completion
 */

/**
 * Runs an intcode program, according to the parameters defined in the config 
 * object.
 * @param {Object} config - Defines the intial state and behavior of the intcode program.
 * @param {number[]} config.memory - Initial state of the memory of the intcode program.
 * @param {number[]} config.inputs - Inputs provided to the intcode program.
 * @param {number} config.index - Initial index within the memory which the intcode program should start.
 * @param {boolean} config.stopOnFirstOutput - Should the intcode program return on the first output.
 * @returns {IntcodeResult} - Final state of the intcode program after completion.
 */
export default function({ 
  memory, 
  inputs, 
  index = 0, 
  stopOnFirstOutput = false
}) {
  const memo = memory.slice();
  let i = index;
  let inputIndex = 0;
  let relativeBase = 0;
  let lastOutput;
  let lastOpcode;
  let lastMemo;

  while(i < memo.length) {
    const instructions = memo[i].toString();
    let opcode = instructions.substring(instructions.length - 2);
    let modesStr = instructions.substring(0, instructions.length - 2);
    opcode = opcode.length === 1 ? '0' + opcode : opcode;
    lastOpcode = opcode;
    if(modesStr.length === 0) {
      modesStr = '000';
    } else if(modesStr.length === 1) {
      modesStr = '00' + modesStr;
    } else if(modesStr.length === 2) {
      modesStr = '0' + modesStr;
    }
    const modes = modesStr.split('').reverse();
    const paramIndicies = modes.map((mode, modeIndex) => {
      const memoIndex = i + modeIndex + 1;
      let paramIndex;
      if(mode === '0') { // positional
        fillZeros(memo, paramIndex);
        return memo[memoIndex];
      } else if(mode === '1') { // immediate
        return memoIndex;
      } else if(mode === '2') { // relative
        fillZeros(memo, paramIndex);
        return memo[memoIndex] + relativeBase;
      }
    });
    const params = paramIndicies.map(paramIndex => memo[paramIndex]);
    if(opcode === '01') { // addition
      memo[paramIndicies[2]] = params[0] + params[1];
      i += 4;
    } else if(opcode === '02') { // multiply
      memo[paramIndicies[2]] = params[0] * params[1];
      i += 4;
    } else if(opcode === '03') { // input update
      memo[paramIndicies[0]] = inputs[inputIndex];
      inputIndex++;
      i += 2;
    } else if(opcode === '04') { // output
      // console.log(`Output: ${params[0]}`);
      lastOutput = params[0];
      i += 2;
      if(stopOnFirstOutput) {
        break;
      }
    } else if(opcode === '05') { // jump-if-true
      if(params[0] !== 0) {
        i = params[1];
      } else {
        i += 3;
      }
    } else if(opcode === '06') { // jump-if-false
      if(params[0] === 0) {
        i = params[1];
      } else {
        i += 3;
      }
    } else if(opcode === '07') { // less than
      memo[paramIndicies[2]] = params[0] < params[1] ? 1 : 0;
      i += 4;
    } else if(opcode === '08') { // equals
      memo[paramIndicies[2]] = params[0] === params[1] ? 1 : 0;
      i += 4;
    } else if(opcode === '09') { // relative base offset
      relativeBase += params[0];
      i += 2;
    } else if(opcode === '99') {
      break;
    }
    lastMemo = memo;
  }
  return {output: lastOutput, index: i, opcode: lastOpcode, memory: lastMemo};
}