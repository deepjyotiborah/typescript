type Combinable = number | String;
type ConversionDescriptor = 'as-number'|'as-text';

function combine(input1: Combinable,
                 input2: Combinable, 
                resultConversion: ConversionDescriptor) {
    let result;
     if (typeof input1 === "number" && typeof input2 ==="number" || resultConversion === 'as-number') {
        result = +input1 + +input2;
     } else {
         result = input1.toString() + input2.toString()
     }
         
     return result;
}

console.log(combine(23, 9, 'as-number'))
console.log(combine('565', '45', 'as-number'))
console.log(combine("Deep", "Borah", 'as-text'));

// Partial: makes the properties of an object optional.
interface CourseGoal {
    title: string,
    description: string,
    completeUntill: Date
}

function createCourseGoal(title: string, desc: string, date: Date) : CourseGoal{
    let courseGoal: Partial<CourseGoal> = {}; // makes CourseGoal properties optional that's why able to assign it to empty object.
    courseGoal.title = title;
    courseGoal.description = desc;
    courseGoal.completeUntill = date;

    return courseGoal as CourseGoal;
}

//Readonly: To make readonly
const names: Readonly<string[]> = ['Deep', 'Max'];
// names.push('Test') // error