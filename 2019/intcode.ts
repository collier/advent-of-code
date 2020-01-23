
function fillZeros(arr: any[], i: number) {
  if(i >= arr.length) {
    const count = i - arr.length + 1;
    arr.push(...new Array(count).fill(0));
  }
}

function formatModes(mode: string): string[] {
  let modes;
  if(mode.length === 0) {
    modes = '000';
  } else if(mode.length === 1) {
    modes = '00' + mode;
  } else if(mode.length === 2) {
    modes = '0' + mode;
  } else {
    modes = mode;
  }
  return modes.split('').reverse();
}

interface IntcodeConfig {
  memory: number[];
  inputs?: number[];
  index?: number; 
  stopOnFirstOutput?: boolean;
}

interface IntcodeResult {
  outputs: number[];
  index: number;
  opcode?: string; 
  memory: number[];
}

export default function(config: IntcodeConfig): IntcodeResult {
  const { 
    memory, 
    inputs = [], 
    index = 0, 
    stopOnFirstOutput = false 
  } = config;
  const memo = memory.slice();
  let i = index;
  let inputIndex = 0;
  let relativeBase = 0;
  let outputs = [];
  let lastOpcode;
  let lastMemo = memo;

  while(i < memo.length) {
    const instructions = memo[i].toString();
    const opcodeStr = instructions.substring(instructions.length - 2);
    const modesStr = instructions.substring(0, instructions.length - 2);
    const opcode = opcodeStr.length === 1 ? '0' + opcodeStr : opcodeStr;
    const modes = formatModes(modesStr);
    lastOpcode = opcode;
    const paramIndicies = modes.map((mode, modeIndex) => {
      const memoIndex = i + modeIndex + 1;
      if(mode === '0') { // positional
        const paramIndex = memo[memoIndex];
        fillZeros(memo, paramIndex);
        return paramIndex;
      } else if(mode === '1') { // immediate
        return memoIndex;
      } else if(mode === '2') { // relative
        const paramIndex = memo[memoIndex] + relativeBase;
        fillZeros(memo, paramIndex);
        return paramIndex;
      } else {
        return -1;
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
      outputs.push(params[0])
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
  return {
    outputs, 
    index: i, 
    opcode: lastOpcode, 
    memory: lastMemo
  };
}