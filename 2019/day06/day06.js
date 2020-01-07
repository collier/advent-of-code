import { readFileSync } from 'fs';

const input = readFileSync('./day06/day06-input.txt', 'utf-8');
// const orbits = input.split('\r\n').map(rel => rel.split(')'));

const orbits = [
  ['COM','B'],
  ['B','C'],
  ['C','D'],
  ['D','E'],
  ['E','F'],
  ['B','G'],
  ['G','H'],
  ['D','I'],
  ['E','J'],
  ['J','K'],
  ['K','L']
];

// Make COM the first orbit map entry
const comIndex = orbits.findIndex(orbit => {
  return orbit[0] === 'COM';
});
[orbits[0], orbits[comIndex]] = [orbits[comIndex], orbits[0]];

function buildTree(orbit) {
  const [m0, m1] = orbit;
  const childOrbits = orbits.filter(orbit => orbit[0] === m0);
  if(!childOrbits.length) {
    return {
      value: m0,
      nodes: [{value: m1}]
    };
  }
  const childNodes = childOrbits.map(childOrbit => buildTree(childOrbit));
  return {
    value: m0,
    nodes: childNodes
  };
}

const orbitTree = buildTree(orbits[0]);

console.log(orbitTree);