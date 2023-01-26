const arr1 = [1, 2, 3, 4, 5, 6];
const arr2 = arr1.slice();

console.log(arr1 === arr2);
const arr4 = [...arr1];
console.log(arr1 == arr4);
const arr3 = arr2.slice(1, 3);
// arr3[0] = 7;

console.log(arr3[0] === arr2[1], arr1);
const b = arr1.reduce((acc, v) => acc = [...acc, v], []);
