// https://www.codewars.com/kata/5a00e05cc374cb34d100000d

const reverseSeq = (n) => [...Array(n)].map((el, i) => n - i);

console.log(reverseSeq(5));