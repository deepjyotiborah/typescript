function combine(input1: number | String,
                 input2: number | String, 
                resultCpnversion: 'as-number'|'as-text') {
    let result;
     if (typeof input1 === "number" && typeof input2 ==="number" || resultCpnversion === 'as-number') {
        result = +input1 + +input2;
     } else {
         result = input1.toString() + input2.toString()
     }
         
     return result;
}

console.log(combine(23, 9, 'as-number'))
console.log(combine('565', '45', 'as-number'))
console.log(combine("Deep", "Borah", 'as-text'));