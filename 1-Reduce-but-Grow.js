//https://www.codewars.com/kata/57f780909f7e8e3183000078/train/javascript

const grow = (x) => x.reduce((acc, curr) => acc * curr);

console.log(grow([2, 2, 2, 2, 2, 2]));