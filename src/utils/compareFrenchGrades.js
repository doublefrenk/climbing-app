/* eslint-disable no-unused-vars */
import SCALE from './generateFrenchScale.js';

const generateValuesMap = (SCALE) => {
  return Object.fromEntries(SCALE.map((grade, index) => [grade, index]));
}
const VALUES = generateValuesMap(SCALE);

const compareFrenchGrades = (gradeA, gradeB) => {
  const valueA = VALUES[gradeA];
  const valueB = VALUES[gradeB];

  if(valueA === undefined || valueB === undefined) {
    throw new Error('Invalid French grade provided');
  }

  return valueA - valueB;
}

const isGreater = (gradeA, gradeB) => {
  return compareFrenchGrades(gradeA, gradeB) > 0;
}

const getMaxGrade = (grades) => {
  return grades.reduce((max, current) => isGreater(current, max) ? current : max);
}

export { compareFrenchGrades, getMaxGrade, isGreater };
