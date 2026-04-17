const numbers = [1,2,3,4,5,6,7,8,9];
const letters = ['a', 'b', 'c'];
const plus = ['', '+'];

const generateFrenchScale = (numbers, letters, plus) => {
  const grades = [];

  for(const n of numbers){
    if(n < 5) {
      grades.push(String(n));
    } else {
      for(const l of letters){
        for(const p of plus){
          grades.push(`${n}${l}${p}`);
        }
      }
    }
  }
  return grades;
}
const SCALE = generateFrenchScale(numbers, letters, plus);
console.log("Generated French Scale:", SCALE);

export default SCALE;