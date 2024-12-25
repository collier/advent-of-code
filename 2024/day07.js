const input = await Deno.readTextFile("./input/day07.txt");

const equations = input.split("\n").map((line) => {
  const [valueStr, numsStr] = line.split(": ");
  const value = Number(valueStr);
  const nums = numsStr.split(" ").map(Number);
  return { value, nums };
});

let part1 = 0;
let part2 = 0;
for (const { value, nums } of equations) {
  const tree = buildNode({ value: nums[0] }, 0, nums);
  if (search(tree, value, false)) {
    part1 += value;
  }
  if (search(tree, value, true)) {
    part2 += value;
  }
}

function buildNode(node, i, nums) {
  if (i < nums.length - 1) {
    node.left = buildNode({ value: node.value + nums[i + 1] }, i + 1, nums);
    node.middle = buildNode({ value: Number(`${node.value}${nums[i + 1]}`) }, i + 1, nums);
    node.right = buildNode({ value: node.value * nums[i + 1] }, i + 1, nums);
  }
  return node;
}

function search(node, target, includeConcat) {
  const permutations = new Set();
  function findValue(node) {
    if (node.left || node.right) {
      findValue(node.left, target);
      if (node.middle && includeConcat) {
        findValue(node.middle, target);
      }
      findValue(node.right, target);
    } else {
      permutations.add(node.value);
    }
  }

  findValue(node);
  return permutations.has(target);
}

console.log("part 1:", part1);
console.log("part 2:", part2);
