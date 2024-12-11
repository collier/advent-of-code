const input = await Deno.readTextFile("./input/day01-part1.txt");

const [l1, l2] = input.split("\n").map((row) => row.split("   ")).reduce(
  (accm, tuple) => {
    accm[0].push(parseInt(tuple[0]));
    accm[1].push(parseInt(tuple[1]));
    return accm;
  },
  [[], []],
);

l1.sort();
l2.sort();

let part1 = 0;
for (let i = 0; i < l1.length; i++) {
  part1 += Math.abs(l1[i] - l2[i]);
}

console.log("part 1:", part1);

const l2counts = {};
for (const l2id of l2) {
  if (!l2counts[l2id]) {
    l2counts[l2id] = 1;
  } else {
    l2counts[l2id]++;
  }
}

let part2 = 0;
for (const l1id of l1) {
  part2 += l1id * (l2counts[l1id] ?? 0);
}

console.log("part 2:", part2);
