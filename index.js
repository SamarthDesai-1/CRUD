const sum = async (a, b) => {
  
  let result = await (a + b);
  return result;
};

let addition = sum(5, 7);
console.log(addition);