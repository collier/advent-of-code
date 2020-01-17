import { readFileSync } from 'fs';

const input = readFileSync('./day10/day10-input.txt', 'utf-8');
const grid = input.split('\r\n').map(row => row.split(''));

function getSlope(p1, p2) {
  const [ x1, y1 ] = p1;
  const [ x2, y2 ] = p2;
  return (y2 - y1) / (x2 - x1);
}

function getQuadrant(p1, p2) {
  const [ x1, y1 ] = p1;
  const [ x2, y2 ] = p2;
  if(x2 >= x1 && y2 < y1) {
    return 1;
  } else if(x2 > x1 && y2 >= y1) {
    return 2;
  } else if(x2 <= x1 && y2 > y1) {
    return 3;
  } else if(x2 < x1 && y2 <= y1) {
    return 4;
  }
}

function comparePointsAsc(p1, p2) {
  const [ x1, y1 ] = p1;
  const [ x2, y2 ] = p2;
  return (x1 + y1) - (x2 + y2);
}

function comparePointsDesc(p1, p2) {
  const [ x1, y1 ] = p1;
  const [ x2, y2 ] = p2;
  return (x2 + y2) - (x1 + y1);
}

function getSlopeMap(p) {
  const [ px, py ] = p;
  const smap = new Map();
  grid.forEach((r, y) => {
    r.forEach((cell, x) => {
      if(!(x === px && y === py) && cell === '#') {
        const s = getSlope(p, [x, y]);
        const q = getQuadrant(p, [x, y]);
        const key = s + ',' + q;
        const val = smap.has(key) ? smap.get(key) : [];
        const points = [...val, [x, y]];
        if(q === 1 || q === 4) {
          points.sort(comparePointsAsc);
        } else {
          points.sort(comparePointsDesc);
        }
        smap.set(key, points);
      }
    })
  })
  return smap;
}

function getSlopes(slopeMap, quad) {
  let slopes = [];
  for(const [ k ] of slopeMap) {
    const [ s, q ] = k.split(',').map(n => parseFloat(n));
    if(q === quad) {
      slopes.push(s);
    }
  }
  slopes.sort((a, b) => a - b);
  if(slopes[slopes.length - 1] === Infinity) {
    slopes.unshift(slopes.pop());
  }
  return slopes;
}

function bestAsteroid() {
  let max = 0;
  let point;
  grid.forEach((r, y) => {
    r.forEach((cell, x) => {
      if(cell === '#') {
        const count = getSlopeMap([x, y]).size;
        if(count > max) {
          max = count;
          point = [x, y];
        }
      }
    });
  });
  return [ max, point ];
}

function vaporizedPoint(point, n) {
  let count = 0;
  let activeP;
  const smap = getSlopeMap(point);
  while(smap.size) {
    for(let q = 1; q <= 4; q++) {
      const slopes = getSlopes(smap, q);
      for(const s of slopes) {
        const key = s + ',' + q;
        const points = smap.get(key);
        activeP = points.pop();
        count++;
        if(count === n) {
          return activeP;
        }
        if(!points.length) {
          smap.delete(key);
        }
      }
    }
  }
}

const [ max, bestPoint ] = bestAsteroid();
const [ vX, vY ] = vaporizedPoint(bestPoint, 200);
const answer2 = (vX * 100) + vY;

console.log(`Answer 1: ${max}`); // 247
console.log(`Answer 2: ${answer2}`); // 1919
