import { readFileSync } from 'fs';

const input = readFileSync('./day08/day08-input.txt', 'utf-8');
const digits = input.split('').map(n => parseInt(n));

const height = 6;
const width = 25;
const layerCount = digits.length / (width * height);

let layers = [];
let layerCounts = [];
let digitIndex = 0;
for(let i = 0; i < layerCount; i++) {
  layerCounts[i] = new Array(10).fill(0);
  for(let j = 0; j < height; j++) {
    if(!layers[j]) {
      layers[j] = []
    }
    for(let k = 0; k < width; k++) {
      const digit = digits[digitIndex];
      layerCounts[i][digit]++;
      if(!layers[j][k]) {
        layers[j][k] = [digit];
      } else {
        layers[j][k] = [...layers[j][k], digit];
      }
      digitIndex++;
    }
  }
}

let minIndex = 0;
let min = +Infinity;
layerCounts.forEach((layerCount, i) => {
  if(layerCount[0] < min) {
    min = layerCount[0];
    minIndex = i;
  }
});
const targetLayerCount = layerCounts[minIndex];
const answer1 = targetLayerCount[1] * targetLayerCount[2];

console.log(`Answer 1: ${answer1}`); // 1792

console.log('Answer 2:'); // LJECH
let image = [];
for(let j = 0; j < height; j++) {
  image[j] = [];
  for(let k = 0; k < width; k++) {
    for(let i = 0; i < layerCount; i++) {
      const layerDigit = layers[j][k][i];
      if(layerDigit === 0 || layerDigit === 1) {
        if(layerDigit === 0) {
          image[j][k] = ' ';
        } else {
          image[j][k] = '0';
        }
        break;
      }
    }
    
  }
  console.log(image[j].reduce((str, n) => str + n, ''));
}
