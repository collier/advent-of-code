const input = await Deno.readTextFile("./input/day03.txt");

const MUL_START = "mul(";
const DO = "do()";
const DONT = "don't()";
const DONT_START = DONT.slice(0, 4);

let part1 = 0;
let i = 0;
let j = MUL_START.length;

while (j < input.length) {
  const window = input.slice(i, j);

  if (window === MUL_START) {
    const product = parseMultiply();
    if (product) {
      part1 += product;
    }
    continue;
  }

  i++;
  j++;
}

console.log("part 1:", part1);

let part2 = 0;
i = 0;
j = MUL_START.length;
let enabled = true;

while (j < input.length) {
  const window = input.slice(i, j);

  if (window === DO) {
    enabled = true;
  }

  if (window === DONT_START) {
    const k = j + 3;
    if (input.slice(i, k) === DONT) {
      enabled = false;
      i = k + 1;
      j = i + MUL_START.length;
      continue;
    }
  }

  if (window === MUL_START && enabled) {
    const product = parseMultiply();
    if (product) {
      part2 += product;
    }
    continue;
  }

  i++;
  j++;
}

console.log("part 2:", part2);

function parseMultiply() {
  let k = j + 1;
  let comma = false;
  let valid = true;
  while (valid) {
    if (/^[0-9]$/.test(input[k])) {
      k++;
      continue;
    }
    if (input[k] === ",") {
      if (comma) {
        valid = false;
        break;
      }
      comma = true;
      k++;
      continue;
    }
    if (input[k] === ")") {
      if (!comma) valid = false;
      break;
    }
    valid = false;
  }

  if (!valid) {
    i++;
    j++;
    return null;
  }

  const [num1, num2] = input.slice(j, k).split(",").map(Number);
  const product = num1 * num2;

  i = k + 1;
  j = i + MUL_START.length;

  return product;
}
