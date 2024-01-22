//https://www.codewars.com/kata/55685cd7ad70877c23000102/train/javascript


function makeNegative(number) {
  // Check if the number is already negative or zero
  if (number <= 0) {
    return number;
  } else {
    // Make the number negative
    return -number;
  }
}

// Examples:
console.log(makeNegative(1));     // Output: -1
console.log(makeNegative(-5));    // Output: -5
console.log(makeNegative(0));     // Output: 0
console.log(makeNegative(0.12));  // Output: -0.12
