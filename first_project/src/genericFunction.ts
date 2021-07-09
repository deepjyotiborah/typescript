interface Lengthy {
    length: number;
}

function countAndDescribe<T extends Lengthy>(element:T) : [T, string] {
    let description = "Got no value.";

    if (element.length === 1) {
        description = 'Got 1 element.'
    } else if(element.length > 1) {
        description = 'Got ' + element.length + ' elements.'
    }
    return [element, description];
}

console.log(countAndDescribe('Hello')); // Since string has length property.
console.log(countAndDescribe(['Hello', 'hi']))
console.log(countAndDescribe([]))

//KeyOf Constrint: T,U extends keyof T tells that U should be a key of type T
function extractAndConvert<T,U extends keyof T>(obj: T, key: U) {
    return 'Value: ' + obj[key]
}

console.log(extractAndConvert({name: 'Deep'}, 'name'));