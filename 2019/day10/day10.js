import { readFileSync } from 'fs';

const input = readFileSync('./day10/day10-input.txt', 'utf-8');
const space = input.split('\r\n').map(row => row.split(''));

function findSlope(p1, p2) {
  const [ x1, y1 ] = p1;
  const [ x2, y2 ] = p2;
  return (y2 - y1) / (x2 - x1);
}

function findQuadrant(p1, p2) {
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

function getSlopeMap(px, py) {
  const slopeMap = new Map();
  for(let y = 0; y < space.length; y++) {
    for(let x = 0; x < space[y].length; x++) {
      if(!(x === px && y === py) && space[y][x] === '#') {
        const slope = findSlope([px, py], [x, y]);
        const quad = findQuadrant([px, py], [x, y]);
        const key = slope + ',' + quad;
        if(!slopeMap.has(key)) {
          slopeMap.set(key, [[x, y]]);
        } else {
          const newPoints = [...slopeMap.get(key), [x, y]];
          if(quad === 1 || quad === 4) {
            newPoints.sort((a, b) => (a[0] + a[1]) - (b[0] + b[1]));
          } else {
            newPoints.sort((a, b) => (b[0] + b[1]) - (a[0] + a[1]));
          }
          slopeMap.set(key, newPoints);
        }
      }
    }
  }
  return slopeMap;
}

function getSlopesByQuad(slopeMap, targetQuad) {
  const result = [];
  for(const [ key ] of slopeMap) {
    const [ slope, quad ] = key.split(',').map(n => parseFloat(n));
    if(quad === targetQuad) {
      result.push(slope);
    }
  }
  result.sort((a, b) => a - b);
  if(result[result.length - 1] === Infinity) {
    result.unshift(result.pop());
  }
  return result;
}

function findNthVaporizedPoint(point, n) {
  let vaporizedCount = 0;
  let lastVaporized;
  const slopeMap = getSlopeMap(...point);
  while(slopeMap.size > 0) {
    for(let i = 1; i <= 4; i++) {
      const slopes = getSlopesByQuad(slopeMap, i);
      for(const slope of slopes) {
        const key = slope + ',' + i;
        const points = slopeMap.get(key);
        lastVaporized = points.pop();
        vaporizedCount++;
        if(vaporizedCount === n) {
          break;
        }
        if(!points.length) {
          slopeMap.delete(key);
        }
      }
      if(vaporizedCount === n) {
        break;
      }
    }
    if(vaporizedCount === n) {
      break;
    }
  }
  return lastVaporized;
}

function findHighestVisibilityAsteroid() {
  let max = 0;
  let maxPoint;
  for(let y = 0; y < space.length; y++) {
    for(let x = 0; x < space[y].length; x++) {
      if(space[y][x] === '#') {
        const visibleAsteroids = getSlopeMap(x, y).size;
        if(visibleAsteroids > max) {
          max = visibleAsteroids;
          maxPoint = [x, y];
        }
      }
    }
  }
  return [ max, maxPoint ];
}

const [ maxVisibleAsteroids, maxPoint ] = findHighestVisibilityAsteroid();
const [ vapX, vapY ] = findNthVaporizedPoint(maxPoint, 200);
const answer1 = maxVisibleAsteroids;
const answer2 = (vapX * 100) + vapY;

console.log(`Answer 1: ${answer1}`); // 247
console.log(`Answer 2: ${answer2}`); // 1919
