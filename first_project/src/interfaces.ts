interface Named {
    nameOptional?: string;
}

interface Greetable extends Named {
    greet(phrase : string) : void;
}

class Person implements Greetable {
    nameOptional?: string;
    constructor(n?: string) {
        this.nameOptional = n;
    }

    greet(phrase: string) {
        if (this.nameOptional) {
            console.log(phrase + ' ' + this.nameOptional);
        } else {
            console.log(phrase)
        }
        
    }
}
const user1 = new Person('Deep')
user1.greet('Hello!!! I am')

const user2 = new Person()
user2.greet('Hello!!!')

interface AddFunction {
    (n1: number, n2:number): number; 
}

let addFn: AddFunction;
addFn = (n1: number, n2: number) => {
    return n1+n2;
}