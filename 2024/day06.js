const input = await Deno.readTextFile("./input/day06.txt");

const grid = input.split("\n").map((line) => line.split(""));

const rows = grid.length, cols = grid[0].length;

const UP = "^", RIGHT = ">", DOWN = "v", LEFT = "<", X = "X", DESK = "#", CRATE = "O";

let init;
for (let y = 0; y < rows; y++) {
  for (let x = 0; x < cols; x++) {
    if (grid[y][x] === UP) init = { y, x };
  }
}

const g = { ...init };
const path = [];
while (g.x >= 0 && g.y >= 0 && g.x <= cols - 1 && g.y <= rows - 1) {
  if (grid[g.y][g.x] === UP || g.y === 0) {
    if (g.y > 0 && grid[g.y - 1][g.x] === DESK) {
      grid[g.y][g.x] = RIGHT;
    } else {
      grid[g.y][g.x] = X;
      path.push([g.y, g.x]);
      g.y--;
      if (g.y > 0) grid[g.y][g.x] = UP;
    }
    continue;
  }

  if (grid[g.y][g.x] === RIGHT || g.x === cols - 1) {
    if (g.x < cols - 1 && grid[g.y][g.x + 1] === DESK) {
      grid[g.y][g.x] = DOWN;
    } else {
      grid[g.y][g.x] = X;
      path.push([g.y, g.x]);
      g.x++;
      if (g.x < cols - 1) grid[g.y][g.x] = RIGHT;
    }
    continue;
  }

  if (grid[g.y][g.x] === DOWN || g.y === cols - 1) {
    if (g.y < rows - 1 && grid[g.y + 1][g.x] === DESK) {
      grid[g.y][g.x] = LEFT;
    } else {
      grid[g.y][g.x] = X;
      path.push([g.y, g.x]);
      g.y++;
      if (g.y < rows - 1) grid[g.y][g.x] = DOWN;
    }
    continue;
  }

  if (grid[g.y][g.x] === LEFT || g.x === 0) {
    if (g.x > 0 && grid[g.y][g.x - 1] === DESK) {
      grid[g.y][g.x] = UP;
    } else {
      grid[g.y][g.x] = X;
      path.push([g.y, g.x]);
      g.x--;
      if (g.x > 0) grid[g.y][g.x] = LEFT;
    }
    continue;
  }
}

function checkLoop(startY, startX) {
  const loop = new Set(JSON.stringify([init.y, init.x, UP]));
  const cgrid = input.split("\n").map((line) => line.split(""));
  const c = { ...init };
  cgrid[startY][startX] = CRATE;

  while (c.x >= 0 && c.y >= 0 && c.x <= cols - 1 && c.y <= rows - 1) {
    if (cgrid[c.y][c.x] === UP || c.y === 0) {
      if (c.y > 0 && [DESK, CRATE].includes(cgrid[c.y - 1][c.x])) {
        cgrid[c.y][c.x] = RIGHT;
        if (loop.has(JSON.stringify([c.y, c.x, cgrid[c.y][c.x]]))) {
          return true;
        }
        loop.add(JSON.stringify([c.y, c.x, cgrid[c.y][c.x]]));
      } else {
        c.y--;
        if (c.y > 0) cgrid[c.y][c.x] = UP;
      }
      continue;
    }

    if (cgrid[c.y][c.x] === RIGHT || c.x === cols - 1) {
      if (c.x < cols - 1 && [DESK, CRATE].includes(cgrid[c.y][c.x + 1])) {
        cgrid[c.y][c.x] = DOWN;
        if (loop.has(JSON.stringify([c.y, c.x, cgrid[c.y][c.x]]))) {
          return true;
        }
        loop.add(JSON.stringify([c.y, c.x, cgrid[c.y][c.x]]));
      } else {
        c.x++;
        if (c.x < cols - 1) cgrid[c.y][c.x] = RIGHT;
      }
      continue;
    }

    if (cgrid[c.y][c.x] === DOWN || c.y === cols - 1) {
      if (c.y < rows - 1 && [DESK, CRATE].includes(cgrid[c.y + 1][c.x])) {
        cgrid[c.y][c.x] = LEFT;
        if (loop.has(JSON.stringify([c.y, c.x, cgrid[c.y][c.x]]))) {
          return true;
        }
        loop.add(JSON.stringify([c.y, c.x, cgrid[c.y][c.x]]));
      } else {
        c.y++;
        if (c.y < rows - 1) cgrid[c.y][c.x] = DOWN;
      }
      continue;
    }

    if (cgrid[c.y][c.x] === LEFT || c.x === 0) {
      if (c.x > 0 && [DESK, CRATE].includes(cgrid[c.y][c.x - 1])) {
        cgrid[c.y][c.x] = UP;
        if (loop.has(JSON.stringify([c.y, c.x, cgrid[c.y][c.x]]))) {
          return true;
        }
        loop.add(JSON.stringify([c.y, c.x, cgrid[c.y][c.x]]));
      } else {
        c.x--;
        if (c.x > 0) cgrid[c.y][c.x] = LEFT;
      }
      continue;
    }
  }
  return false;
}

let part1 = 0;
for (let y = 0; y < rows; y++) {
  for (let x = 0; x < cols; x++) {
    if (grid[y][x] === X) part1++;
  }
}

const obstructions = new Set();
for (const [y, x] of path) {
  if (y === init.y && x === init.x) {
    continue;
  }
  if (checkLoop(y, x)) {
    obstructions.add(JSON.stringify([y, x]));
  }
}

console.log("part 1:", part1);
console.log("part 2:", obstructions.size);
