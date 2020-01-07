import { readFileSync } from 'fs';

const input = readFileSync('./day06/day06-input.txt', 'utf-8');
const orbits = input.split('\r\n').map(rel => rel.split(')'));

function buildTree(centerMass) {
  const orbitMasses = orbits
    .filter(orbit => orbit[0] === centerMass)
    .map(orbit => buildTree(orbit[1]))
  return {
    value: centerMass,
    nodes: orbitMasses
  }
}

function orbitCount(orbitTree, depth = 0) {
  const nodes = orbitTree.nodes;
  if(!nodes.length) {
    return depth;
  }
  return nodes
    .map(node => orbitCount(node, depth + 1))
    .reduce((sum, n) => sum + n, 0) + depth;
}

function pathToMass(orbitTree, mass, path = []) {
  const { value, nodes } = orbitTree;
  const newPath = [...path, value];
  if(!nodes.length || value === mass) {
    return newPath;
  }
  const paths = nodes.map(node => pathToMass(node, mass, newPath));
  const targetPath = paths.find(path => path.find(step => step === mass));
  return targetPath || newPath;
}

function minOrbitTransfers(orbitTree, massA, massB) {
  const pathA = pathToMass(orbitTree, massA);
  const pathB = pathToMass(orbitTree, massB);
  let commonOrbitIndex;
  for(let i = 0; i < pathA.length; i++) {
    if(pathA[i] !== pathB[i]) {
      commonOrbitIndex = i - 1;
      break;
    }
  }
  const transfersA = pathA.slice(commonOrbitIndex + 1, pathA.length - 1).length;
  const transfersB = pathB.slice(commonOrbitIndex + 1, pathB.length - 1).length;
  return transfersA + transfersB;
}

const orbitTree = buildTree('COM');
const answer1 = orbitCount(orbitTree);
const answer2 = minOrbitTransfers(orbitTree, 'YOU', 'SAN');

console.log(`Answer 1: ${answer1}`); // 245089
console.log(`Answer 1: ${answer2}`); // 511
