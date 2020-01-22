let part1Count = 0;
let part2Count = 0;

for(let i = 353096; i < 843212; i++) {
  const num = i.toString().split('');
  let isIncreasing = true;
  let hasDouble1 = false;
  let hasDouble2 = false;
  let activeDigitCount = 1;
  let activeDigit = num[0];
  for(let i = 1; i < 6; i++) {
    if(num[i] < num[i-1]) {
      isIncreasing = false;
      break;
    }
    if(num[i] === num[i-1]) {
      hasDouble1 = true;
    }
    const isMatch = num[i] === activeDigit;
    const isLastIter = i + 1 === 6;
    if(isMatch) {
      activeDigitCount++;
    }
    if((isLastIter || !isMatch) && activeDigitCount === 2) {
      hasDouble2 = true;
    }
    if(!isMatch) {
      activeDigit = num[i];
      activeDigitCount = 1;
    }
  }
  if(isIncreasing && hasDouble1) {
    part1Count++;
  }
  if(isIncreasing && hasDouble2) {
    part2Count++;
  }
}

console.log(`Answer 1 is: ${part1Count}`); // 579
console.log(`Answer 2 is: ${part2Count}`); // 358