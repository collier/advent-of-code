export default function(initMemory, input) {
  const memo = initMemory.slice();
  let i = 0;
  let lastOutput;
  let inputIndex = 0;
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
      memo[memo[i+1]] = input[inputIndex];
      inputIndex++;
      i += 2;
    } else if(opcode === '04') { // output
      // console.log(`Output: ${param1}`);
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