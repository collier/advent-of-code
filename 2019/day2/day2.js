import { readFileCSV } from '../util.js';

(async function() {
  const lines = await readFileCSV('./day2/input.txt');
  const intcode = lines.map(line => parseInt(line));
  intcode[1] = 12;
  intcode[2] = 2;

  for (let i = 0; i < intcode.length; i += 4) {
    const opcode = intcode[i];
    if (opcode === 99) {
      break;
    }
  }

  console.log(intcode);
})();
