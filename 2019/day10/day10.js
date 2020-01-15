import { readFileSync } from 'fs';

const input = readFileSync('./day10/day10-input.txt', 'utf-8');
const space = input.split('\r\n').map(row => row.split(''));

function findSlope(p0, p1) {
  const [ p1x, p1y ] = p1;
  const [ p0x, p0y ] = p0;
  return (p1y - p1x) / (p0y - p0x);
}

function findVisibleAsteroids(px, py) {
  let results = [];
  let slopes = {};
  for(let x = 0; x < space.length; x++) {
    for(let y = 0; y < space[x].length; y++) {
      if(x !== px && y !== py) {
        const slope = findSlope([px, py],[x, y]);
        if(!slopes[slope]) {
          results.push([x, y]);
          slopes[slope] = true;
        }
      }
    }
  }
  return results.length;
} 

let max = 0;
for(let x = 0; x < space.length; x++) {
  for(let y = 0; y < space[x].length; y++) {
    var visibleAsteroids = findVisibleAsteroids(x, y);
    if(visibleAsteroids > max) {
      max = visibleAsteroids;
    }
    console.log(x, y, visibleAsteroids);
  }
}