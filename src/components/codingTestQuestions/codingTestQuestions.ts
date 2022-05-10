export {};

// /**
//  * @param {string} s
//  * @return {number}
//  */
//  const romanToInt = function(s: string) {
//   const numerals = {
//       I: {value:1, count: 0},
//       V: {value:5, count: 0},
//       X: {value:10, count: 0},
//       L: {value:50, count: 0},
//       C: {value:100, count: 0},
//       D: {value:500, count: 0},
//       M: {value:1000, count: 0}
//   }    
//   let reverse = s.split('');
//   reverse.reverse();
//   let total = 0;
//   reverse.forEach((char) => {
//       numerals[char].count = numerals[char].count + 1; 
//   })

//   const numeralKeys = Object.keys(numerals);
//   numeralKeys.forEach((numeral) => {
//       const numeralValue = numerals[numeral].value * numerals[numeral].count;
//       total = total + numeralValue;
//   })

// check if current char value is greater than or less than previous char

//   if(s.includes('IV')) {
//       total = total - 2;
//   } 
//   if (s.includes('IX')) {
//       total = total - 2; 
//   } 
//   if (s.includes('XL')) {
//       total = total - 20;
//   }
//   if (s.includes('XC')) {
//       total = total - 20;
//   }
//   if (s.includes('CD')) {
//       total = total - 200;
//   }
//   if (s.includes('CM')) {
//       total = total - 200;
//   }
  
//   return total
// };


//------------------------------convert number to roman-------------------//
/**
 * @param {number} num
 * @return {string}
 */
//  var intToRoman = function(num) {
//   const numerals = {
//       I: {value:1, count: 0},
//       IV: {value:4, count: 0},
//       V: {value:5, count: 0},
//       IX: {value:9, count: 0},
//       X: {value:10, count: 0},
//       XL:{value: 40, count: 0},
//       L: {value:50, count: 0},
//       XC: {value: 90, count:0},
//       C: {value:100, count: 0},
//       CD: {value:400, count: 0},
//       D: {value:500, count: 0},
//       CM:{value: 900, count: 0},
//       M: {value:1000, count: 0},
//   }    
  
//   const numeralKeys = Object.keys(numerals).reverse();
//   let numRemaining = num;
//   numeralKeys.forEach((numeral) => {
//       if(numRemaining >= numerals[numeral].value) { 
//           const theMath = Math.floor(numRemaining / numerals[numeral].value);
//           numRemaining = numRemaining - (theMath * numerals[numeral].value);
//           numerals[numeral].count = theMath;
//       }
//   })
//   let romanString = '';
//   numeralKeys.forEach(numeral => {
//       let doLoop = true;
//       let numeralString = '';
//       let i = 0;
//       for (let i = 0; i < numerals[numeral].count; i++) {
//           numeralString = numeralString + numeral;
//       }
//       romanString = romanString + numeralString;
//   })
//   return romanString;
// };