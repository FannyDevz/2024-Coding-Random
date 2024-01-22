//https://www.codewars.com/kata/541c8630095125aba6000c00/train/javascript

function digitalRoot(n) {
    let sum = String(n).split('').reduce((acc, digit) => acc + parseInt(digit), 0);
  
    if (sum >= 10) {
      return digitalRoot(sum);
    } else {
      return sum;
    }
  }
  
  // Example usage
  console.log(digitalRoot(942)); // Output: 6
  