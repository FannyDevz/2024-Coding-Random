//https://www.codewars.com/kata/514b92a657cdc65150000006/train/javascript



function solution(number) {
    // Check if the number is negative
    if (number < 0) {
      return 0;
    }
  
    // Initialize sum to 0
    let sum = 0;
  
    // Iterate through all numbers below the given number
    for (let i = 0; i < number; i++) {
      // Check if the current number is a multiple of 3 or 5
      if (i % 3 === 0 || i % 5 === 0) {
        // Add the current number to the sum
        sum += i;
      }
    }
  
    // Return the final sum
    return sum;
  }
  
  // Example usage:
  const result = solution(10);