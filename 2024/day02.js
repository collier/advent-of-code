const input = await Deno.readTextFile("./input/day02.txt");

const reports = input.split("\n").map((line) => line.split(" ").map(Number));

let part1 = 0;
for (const report of reports) {
  if (checkIsSafe(report)) part1++;
}

console.log("part 1:", part1);

let part2 = 0;
for (const report of reports) {
  if (checkIsSafe(report)) {
    part2++;
    continue;
  }

  for (let i = 0; i < report.length; i++) {
    const damped = report.filter((_, d) => d !== i);
    if (checkIsSafe(damped)) {
      part2++;
      break;
    }
  }
}

function checkIsSafe(report) {
  const decreasing = report.at(0) > report.at(-1);
  for (let i = 1; i < report.length; i++) {
    const diff = report[i] - report[i - 1];
    if (diff === 0) {
      return false;
    }
    if (decreasing) {
      if (diff > 0 || diff < -3) {
        return false;
      }
    } else {
      if (diff < 0 || diff > 3) {
        return false;
      }
    }
  }
  return true;
}

console.log("part 2:", part2);
