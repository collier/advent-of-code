import { readFileSync } from 'fs';

const data = readFileSync('./day03-input.txt', 'utf-8');
const [wireA, wireB] = data.split('\n').map(line => line.split(','));

function toCoords(wire) {
  let coords = [[0,0,'U']];
  wire.forEach((vector, i) => {
    const [px, py] = coords[i];
    const direction = vector.substring(0, 1);
    const magnitude = parseInt(vector.substring(1));
    if(direction === 'U') {
      coords.push([px, py + magnitude, direction]);
    } else if(direction === 'D') {
      coords.push([px, py - magnitude, direction]);
    } else if(direction === 'R') {
      coords.push([px + magnitude, py, direction]);
    } else if(direction === 'L') {
      coords.push([px - magnitude, py, direction]);
    }
  });
  return coords;
}

function toSegments(coords) {
  let segments = [];
  for(let i = 0; i < coords.length - 1; i++) {
    let a = coords[i];
    let b = coords[i+1];
    let segmentDirection = b[2];
    if((a[0] === b[0] && b[1] < a[1]) || (a[1] === b[1] && b[0] < a[0])) {
      [a, b] = [b, a];
    }  
    let steps = 0;
    if(segments.length) {
      steps = segments[i-1][2];
    }
    if(a[0] === b[0]) {
      steps += Math.abs(b[1] - a[1]);
    }
    if(a[1] === b[1]) {
      steps += Math.abs(b[0] - a[0]);
    }
    segments.push([a, b, steps, segmentDirection]);
  }
  return segments;
}

function toIntsectCoords(segmentsA, segmentsB) {
  let intersectCoords = [];
  for(let i = 0; i < segmentsA.length; i++) {
    for(let j = 0; j < segmentsB.length; j++) {
      const a = segmentsA[i];
      const b = segmentsB[j];
      const [a0, a1, aSteps, aDirection] = a;
      const [b0, b1, bSteps, bDirection] = b;
      const [a0x, a0y] = a0;
      const [a1x, a1y] = a1;
      const [b0x, b0y] = b0;
      const [b1x, b1y] = b1;
      // if segment A is a verticle line
      if(a0x === a1x && (b0x < a0x && a0x < b1x) && (a0y < b1y && b1y < a1y)) {
        let aStepsToIntersect = aSteps;
        if(aDirection === 'U') {
          aStepsToIntersect -= a1y - b1y;
        } else if (aDirection === 'D') {
          aStepsToIntersect -= b0y - a0y;
        }
        let bStepsToIntersect = bSteps;
        if(bDirection === 'R') {
          bStepsToIntersect -= b1x - a1x;
        } else if (bDirection === 'L') {
          bStepsToIntersect -= a0x - b0x;
        }
        const combinedSteps = aStepsToIntersect + bStepsToIntersect;
        intersectCoords.push([a0x, b0y, combinedSteps]);
      }
      // if segment A is a horizontal line
      if(a0y === a1y && (b0y < a0y && a0y < b1y) && (a0x < b1x && b1x < a1x)) {
        let aStepsToIntersect = aSteps;
        if(aDirection === 'R') {
          aStepsToIntersect -= a1x - b1x;
        } else if (aDirection === 'L') {
          aStepsToIntersect -= b0x - a0x;
        }
        let bStepsToIntersect = bSteps;
        if(bDirection === 'U') {
          bStepsToIntersect -= b1y - a1y;
        } else if (bDirection === 'D') {
          bStepsToIntersect -= a0y - b0y;
        }
        const combinedSteps = aStepsToIntersect + bStepsToIntersect;
        intersectCoords.push([b0x, a0y, combinedSteps]);
      }
    }
  }
  return intersectCoords;
}

function findSmallestManhattanDistance(coords) {
  const manhattanDistances = coords.map(coord => {
    return Math.abs(coord[0]) + Math.abs(coord[1]);
  });
  return Math.min(...manhattanDistances);
}

function findSmallestSteps(coordsWithSteps) {
  const stepLengths = coordsWithSteps.map(coord => coord[2]);
  return Math.min(...stepLengths);
}

const segmentsA = toSegments(toCoords(wireA));
const segmentsB = toSegments(toCoords(wireB));
const intersectCoords = toIntsectCoords(segmentsA, segmentsB);
const smallestManhattanDistance = findSmallestManhattanDistance(intersectCoords);
const smallestSteps = findSmallestSteps(intersectCoords);

console.log(`Answer 1 is: ${smallestManhattanDistance}`); // 207
console.log(`Answer 2 is: ${smallestSteps}`); // 21196

