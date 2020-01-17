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
  const slopeMap = new Map();
  space.forEach((row, y) => {
    row.forEach((cell, x) => {
      if(!(x === px && y === py) && cell === '#') {
        const slope = findSlope(p, [x, y]);
        const quad = findQuadrant(p, [x, y]);
        const key = slope + ',' + quad;
        const currentPoints = slopeMap.has(key) ? slopeMap.get(key) : [];
        const updatedPoints = [...currentPoints, [x, y]];
        if(quad === 1 || quad === 4) {
          updatedPoints.sort(comparePointsAsc);
        } else {
          updatedPoints.sort(comparePointsDesc);
        }
        slopeMap.set(key, updatedPoints);
      }
    })
  })
  return slopeMap;
}

function getSlopesByQuad(slopeMap, targetQuad) {
  const slopes = [];
  for(const [ key ] of slopeMap) {
    const [ slope, quad ] = key.split(',').map(n => parseFloat(n));
    if(quad === targetQuad) {
      slopes.push(slope);
    }
  }
  slopes.sort((a, b) => a - b);
  if(slopes[slopes.length - 1] === Infinity) {
    slopes.unshift(slopes.pop());
  }
  return slopes;
}

function findHighestVisibilityAsteroid() {
  let max = 0;
  let maxPoint;
  space.forEach((row, y) => {
    row.forEach((cell, x) => {
      if(cell === '#') {
        const visibleAsteroids = getSlopeMap([x, y]).size;
        if(visibleAsteroids > max) {
          max = visibleAsteroids;
          maxPoint = [x, y];
        }
      }
    });
  });
  return [ max, maxPoint ];
}

function findNthVaporizedPoint(point, n) {
  let vaporizedCount = 0;
  let lastVaporized;
  const slopeMap = getSlopeMap(point);
  while(slopeMap.size) {
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

const [ maxVisibleAsteroids, maxPoint ] = findHighestVisibilityAsteroid();
const [ vapX, vapY ] = findNthVaporizedPoint(maxPoint, 200);
const answer1 = maxVisibleAsteroids;
const answer2 = (vapX * 100) + vapY;

console.log(`Answer 1: ${answer1}`); // 247
console.log(`Answer 2: ${answer2}`); // 1919
