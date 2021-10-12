import { readFileSync } from 'fs';

const input = readFileSync('./day03/day03-input.txt', 'utf-8');
const [wireA, wireB] = input.split('\n').map(line => line.split(','));

interface Coordinates {
  x: number;
  y: number;
  dir: string;
}

function toCoords(wire: string[]): Coordinates[] {
  let coords: Coordinates[] = [{x: 0, y: 0, dir: 'U'}];
  for(const [ i, vector ] of wire.entries()) {
    const { x, y } = coords[i];
    const dir = vector.substring(0, 1);
    const magnitude = parseInt(vector.substring(1));
    if(dir === 'U') {
      coords.push({x, y: y + magnitude, dir});
    } else if(dir === 'D') {
      coords.push({x, y: y - magnitude, dir});
    } else if(dir === 'R') {
      coords.push({x: x + magnitude, y, dir});
    } else if(dir === 'L') {
      coords.push({x: x - magnitude, y, dir});
    }
  }
  return coords;
}

interface Segment {
  coords: Coordinates[];
  steps: number;
  dir: string;
}

function toSegments(coords: Coordinates[]): Segment[] {
  let segments: Segment[] = [];
  for(let i = 0; i < coords.length - 1; i++) {
    let [ a, b ] = [coords[i], coords[i+1]];
    let dir = b.dir;
    if((a.x === b.x && b.y < a.y) || (a.y === b.y && b.x < a.x)) {
      [a, b] = [b, a];
    }
    let steps = 0;
    if(segments.length) {
      steps = segments[i-1].steps;
    }
    if(a.x === b.x) {
      steps += Math.abs(b.y - a.y);
    }
    if(a.y === b.y) {
      steps += Math.abs(b.x - a.x);
    }
    segments.push({
      coords: [a, b], 
      steps, 
      dir
    });
  }
  return segments;
}

interface Intersection {
  x: number;
  y: number;
  steps: number;
}

function toIntsectCoords(segmentsA: Segment[], segmentsB: Segment[]): Intersection[] {
  let intersectCoords: Intersection[] = [];
  for(const a of segmentsA) {
    for(const b of segmentsB) {
      const {coords: [a0, a1], steps: aSteps, dir: aDir} = a;
      const {coords: [b0, b1], steps: bSteps, dir: bDir} = b;
      // if segment A is a verticle line
      if(a0.x === a1.x && (b0.x < a0.x && a0.x < b1.x) && (a0.y < b1.y && b1.y < a1.y)) {
        let aStepsToIntersect = aSteps;
        if(aDir === 'U') {
          aStepsToIntersect -= a1.y - b1.y;
        } else if (aDir === 'D') {
          aStepsToIntersect -= b0.y - a0.y;
        }
        let bStepsToIntersect = bSteps;
        if(bDir === 'R') {
          bStepsToIntersect -= b1.x - a1.x;
        } else if (bDir === 'L') {
          bStepsToIntersect -= a0.x - b0.x;
        }
        const combinedSteps = aStepsToIntersect + bStepsToIntersect;
        intersectCoords.push({x: a0.x, y: b0.y, steps: combinedSteps});
      }
      // if segment A is a horizontal line
      if(a0.y === a1.y && (b0.y < a0.y && a0.y < b1.y) && (a0.x < b1.x && b1.x < a1.x)) {
        let aStepsToIntersect = aSteps;
        if(aDir === 'R') {
          aStepsToIntersect -= a1.x - b1.x;
        } else if (aDir === 'L') {
          aStepsToIntersect -= b0.x - a0.x;
        }
        let bStepsToIntersect = bSteps;
        if(bDir === 'U') {
          bStepsToIntersect -= b1.y - a1.y;
        } else if (bDir === 'D') {
          bStepsToIntersect -= a0.y - b0.y;
        }
        const combinedSteps = aStepsToIntersect + bStepsToIntersect;
        intersectCoords.push({x: b0.x, y: a0.y, steps: combinedSteps});
      }
    }
  }
  return intersectCoords;
}

function findSmallestManhattanDistance(intersections: Intersection[]): number {
  const manhattanDistances = intersections.map(({x, y}) => {
    return Math.abs(x) + Math.abs(y);
  });
  return Math.min(...manhattanDistances);
}

function findSmallestSteps(intersections: Intersection[]): number {
  const stepLengths = intersections.map(intersection => intersection.steps);
  return Math.min(...stepLengths);
}

const segmentsA = toSegments(toCoords(wireA));
const segmentsB = toSegments(toCoords(wireB));
const intersectCoords = toIntsectCoords(segmentsA, segmentsB);
const answer1 = findSmallestManhattanDistance(intersectCoords);
const answer2 = findSmallestSteps(intersectCoords);

console.log(`Answer 1: ${answer1}`); // 207
console.log(`Answer 2: ${answer2}`); // 21196

