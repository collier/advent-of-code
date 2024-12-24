const input = await Deno.readTextFile("./input/day06.txt");

const grid = input.split("\n").map((line) => line.split(""));

const rows = grid.length, cols = grid[0].length;

const UP = "^", RIGHT = ">", DOWN = "v", LEFT = "<", DESK = "#", CRATE = "O";

let init;
for (let y = 0; y < rows; y++) {
  for (let x = 0; x < cols; x++) {
    if (grid[y][x] === UP) init = { y, x };
  }
}

function patrol(crate) {
  const loop = new Set();
  const path = [[init.y, init.x]];
  const grid = input.split("\n").map((line) => line.split(""));
  const g = { ...init };

  if (crate) grid[crate.y][crate.x] = CRATE;

  while (g.x >= 0 && g.y >= 0 && g.x <= cols - 1 && g.y <= rows - 1) {
    if (grid[g.y][g.x] === UP || g.y === 0) {
      if (g.y > 0 && [DESK, CRATE].includes(grid[g.y - 1][g.x])) {
        grid[g.y][g.x] = RIGHT;
        if (loop.has(JSON.stringify([g.y, g.x, RIGHT]))) {
          return null;
        }
        loop.add(JSON.stringify([g.y, g.x, RIGHT]));
      } else {
        path.push([g.y, g.x]);
        g.y--;
        if (g.y > 0) grid[g.y][g.x] = UP;
      }
      continue;
    }

    if (grid[g.y][g.x] === RIGHT || g.x === cols - 1) {
      if (g.x < cols - 1 && [DESK, CRATE].includes(grid[g.y][g.x + 1])) {
        grid[g.y][g.x] = DOWN;
        if (loop.has(JSON.stringify([g.y, g.x, DOWN]))) {
          return null;
        }
        loop.add(JSON.stringify([g.y, g.x, DOWN]));
      } else {
        path.push([g.y, g.x]);
        g.x++;
        if (g.x < cols - 1) grid[g.y][g.x] = RIGHT;
      }
      continue;
    }

    if (grid[g.y][g.x] === DOWN || g.y === cols - 1) {
      if (g.y < rows - 1 && [DESK, CRATE].includes(grid[g.y + 1][g.x])) {
        grid[g.y][g.x] = LEFT;
        if (loop.has(JSON.stringify([g.y, g.x, LEFT]))) {
          return null;
        }
        loop.add(JSON.stringify([g.y, g.x, LEFT]));
      } else {
        path.push([g.y, g.x]);
        g.y++;
        if (g.y < rows - 1) grid[g.y][g.x] = DOWN;
      }
      continue;
    }

    if (grid[g.y][g.x] === LEFT || g.x === 0) {
      if (g.x > 0 && [DESK, CRATE].includes(grid[g.y][g.x - 1])) {
        grid[g.y][g.x] = UP;
        if (loop.has(JSON.stringify([g.y, g.x, UP]))) {
          return null;
        }
        loop.add(JSON.stringify([g.y, g.x, UP]));
      } else {
        path.push([g.y, g.x]);
        g.x--;
        if (g.x > 0) grid[g.y][g.x] = LEFT;
      }
      continue;
    }
  }

  return path;
}

const path = patrol();
const positions = new Set(path.map((p) => JSON.stringify(p)));

const obstructions = new Set();
for (const [y, x] of path) {
  if (!(y === init.y && x === init.x) && patrol({ y, x }) === null) {
    obstructions.add(JSON.stringify([y, x]));
  }
}

console.log("part 1:", positions.size);
console.log("part 2:", obstructions.size);
