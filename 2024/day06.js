const input = await Deno.readTextFile("./input/day06.txt");

const g = { x: 85, y: 48 };

// const input = `....#.....
// .........#
// ..........
// ..#.......
// .......#..
// ..........
// .#..^.....
// ........#.
// #.........
// ......#...`;

// const g = { x: 4, y: 6 };

const grid = input.split("\n").map((line) => line.split(""));

const rows = grid.length, cols = grid[0].length;

const UP = "^", RIGHT = ">", DOWN = "v", LEFT = "<", X = "X";

while (g.x > 0 && g.y > 0 && g.x < cols - 1 && g.y < rows - 1) {
  if (grid[g.y][g.x] === UP) {
    if (grid[g.y - 1][g.x] === "#") {
      grid[g.y][g.x] = RIGHT;
    } else {
      grid[g.y - 1][g.x] = UP;
      grid[g.y][g.x] = X;
      g.y--;
    }
  }

  if (grid[g.y][g.x] === RIGHT) {
    if (grid[g.y][g.x + 1] === "#") {
      grid[g.y][g.x] = DOWN;
    } else {
      grid[g.y][g.x + 1] = RIGHT;
      grid[g.y][g.x] = X;
      g.x++;
    }
  }

  if (grid[g.y][g.x] === DOWN) {
    if (grid[g.y + 1][g.x] === "#") {
      grid[g.y][g.x] = LEFT;
    } else {
      grid[g.y + 1][g.x] = DOWN;
      grid[g.y][g.x] = X;
      g.y++;
    }
  }

  if (grid[g.y][g.x] === LEFT) {
    if (grid[g.y][g.x - 1] === "#") {
      grid[g.y][g.x] = UP;
    } else {
      grid[g.y][g.x - 1] = LEFT;
      grid[g.y][g.x] = X;
      g.x--;
    }
  }
}
grid[g.y][g.x] = X;

let part1 = 0;
for (let y = 0; y < rows; y++) {
  for (let x = 0; x < cols; x++) {
    if (grid[y][x] === X) part1++;
  }
}

console.log("part 1:", part1);

// console.log(grid.map((line) => line.join("")).join("\n"));
