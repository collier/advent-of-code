const input = await Deno.readTextFile("./input/day05.txt");

const [rulesStr, pagesStr] = input.split("\n\n");
const rules = rulesStr.split("\n").map((line) => line.split("|").map(Number));
const updates = pagesStr.split("\n").map((line) => line.split(",").map(Number));

let part1 = 0;
let part2 = 0;

const rulesMap = {};
for (const [left, right] of rules) {
  if (!rulesMap[left]) {
    rulesMap[left] = [right];
  } else {
    rulesMap[left] = [...rulesMap[left], right];
  }
}

function middle(arr) {
  return arr[(arr.length - 1) / 2];
}

for (const update of updates) {
  let passes = true;
  for (let i = update.length - 1; i > 0; i--) {
    if (rulesMap[update[i]]) {
      for (let j = i - 1; j >= 0; j--) {
        if (rulesMap[update[i]].includes(update[j])) {
          passes = false;
          break;
        }
      }
    }
  }
  if (passes) {
    part1 += middle(update);
  } else {
    let i = update.length - 1;
    while (i > 0) {
      if (rulesMap[update[i]]) {
        let j = i - 1;
        while (j >= 0) {
          if (rulesMap[update[i]].includes(update[j])) {
            [update[i], update[j]] = [update[j], update[i]];
            i = update.length;
            j = i - 2;
            break;
          }
          j--;
        }
      }
      i--;
    }
    part2 += middle(update);
  }
}

console.log("part 1:", part1);
console.log("part 2:", part2);
