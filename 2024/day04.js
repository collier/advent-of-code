const inputStr = await Deno.readTextFile("./input/day04.txt");
const input = inputStr.split("\n").map((line) => line.split(""));

let part1 = 0;
for (let y = 0; y < 140; y++) {
  for (let x = 0; x < 140; x++) {
    // deno-fmt-ignore
    if (input[y][x] === "X") {
      if (y >= 3 &&                isMAS(input[y-1][x], input[y-2][x], input[y-3][x]))        part1++;
      if (x <= 136 && y >= 3 &&    isMAS(input[y-1][x+1], input[y-2][x+2], input[y-3][x+3]))  part1++;
      if (x <= 136 &&              isMAS(input[y][x+1], input[y][x+2], input[y][x+3]))        part1++;
      if (x <= 136 && y <= 136 &&  isMAS(input[y+1][x+1], input[y+2][x+2], input[y+3][x+3]))  part1++;
      if (y <= 136 &&              isMAS(input[y+1][x], input[y+2][x], input[y+3][x]))        part1++;
      if (x >= 3 && y <= 136 &&    isMAS(input[y+1][x-1], input[y+2][x-2], input[y+3][x-3]))  part1++;
      if (x >= 3 &&                isMAS(input[y][x-1], input[y][x-2], input[y][x-3]))        part1++;
      if (x >= 3 && y >= 3 &&      isMAS(input[y-1][x-1], input[y-2][x-2], input[y-3][x-3]))  part1++;
    }
  }
}

function isMAS(c1, c2, c3) {
  return c1 === "M" && c2 === "A" && c3 === "S";
}

console.log("part 1:", part1);

let part2 = 0;
for (let y = 1; y < 139; y++) {
  for (let x = 1; x < 139; x++) {
    if (input[y][x] === "A") {
      const tl = input[y - 1][x - 1];
      const tr = input[y + 1][x - 1];
      const bl = input[y - 1][x + 1];
      const br = input[y + 1][x + 1];

      // deno-fmt-ignore
      if(
        (tl === "M" && tr === "M" && bl === "S" && br === "S") ||
        (tl === "S" && tr === "M" && bl === "S" && br === "M") ||
        (tl === "M" && tr === "S" && bl === "M" && br === "S") ||
        (tl === "S" && tr === "S" && bl === "M" && br === "M")
      ) {
        part2++;
      }
    }
  }
}

console.log("part 2:", part2);
