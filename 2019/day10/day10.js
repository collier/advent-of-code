import { readFileSync } from 'fs';

const input = readFileSync('./day10/day10-input.txt', 'utf-8');
const space = input.split('\r\n').map(row => row.split(''));

function findSlope(p1, p2) {
  const [ x1, y1 ] = p1;
  const [ x2, y2 ] = p2;
  return (y2 - y1) / (x2 - x1);
}

function countVisibleAsteroids(px, py) {
  const slopes = new Set();
  for(let x = 0; x < space.length; x++) {
    for(let y = 0; y < space[x].length; y++) {
      if(!(x === px && y === py) && space[x][y] === '#') {
        const slope = findSlope([px, py],[x, y]);
        console.log([px, py],[x, y], slope);
        slopes.add(slope);
      }
    }
  }
  return slopes.size;
} 

countVisibleAsteroids(3,4);

// let max = 0;
// let maxPoint;
// for(let x = 0; x < space.length; x++) {
//   for(let y = 0; y < space[x].length; y++) {
//     if(space[x][y] === '#') {
//       const visibleAsteroids = countVisibleAsteroids(x, y);
//       console.log([x, y], visibleAsteroids);
//       if(visibleAsteroids > max) {
//         max = visibleAsteroids;
//         maxPoint = [x, y];
//       }
//     }
//   }
// }

// console.log(maxPoint, max);