type Admin = {
    name: string;
    privilages: string[];
}

type Employee = {
    name: string;
    startDate: Date;
}

// Intersaction types.
type ElevatedEmployee = Admin & Employee;

let emp1: ElevatedEmployee = {
    name: 'Deep',
    privilages: ['create-server'],
    startDate: new Date()
}

type UnknownEmployee = Admin | Employee

function printDetails(emp:UnknownEmployee) {
    console.log('Name -' + emp.name);
    
    // checking field in type
    if ('privilages' in emp) {
        console.log('privilages - ' + emp.privilages);
    }

    if ('startDate' in emp) {
        console.log('startDate - ' + emp.startDate);
    }
}

printDetails(emp1);

class Car {
    drive() {
        console.log('Driving a car ...');
    }
}

class Truck {
    drive() {
        console.log('Driving a truck ...');
    }

    loadCargo(amount: number) {
        console.log('Loading cargo ... ' + amount)
    }
}

type Vehicle = Car | Truck;
function useVehicle(vehicle: Vehicle) {
    vehicle.drive();
    // Checking object type
    if (vehicle instanceof Truck) {
        vehicle.loadCargo(1000);
    }
}

let v1: Vehicle = new Car();
let v2: Vehicle = new Truck();

useVehicle(v1);
useVehicle(v2);

//Disciminated unions
interface Bird {
    type: 'Bird';
    flyingSpeed: number;
}

interface Horse {
    type: 'Horse',
    runningSpeed: number;
}

type Animal = Bird | Horse;

function moveAnimal(animal: Animal) {
    let speed: number;

    switch(animal.type) {
        case 'Bird': speed = animal.flyingSpeed;
        break;

        case 'Horse' : speed = animal.runningSpeed;
    }

    console.log('Moving speed ' + speed);
}

moveAnimal({type: 'Bird', flyingSpeed: 200})

//Type casting
// let inputElement = <HTMLInputElement> document.getElementById("user-input")!
let inputElement = document.getElementById("user-input")! as HTMLInputElement
inputElement.value = "Hi I am there!!!"

//Index properties

interface ErrorContainer {
    [prop: string]: string;
}

const errorBag: ErrorContainer = {
    email: 'Not a valid email',
    username: 'Must start with a character'
}

//Funtion overload
type CombineType = string | number;

function add(n1: number, n2: number):number;
function add(n1: string, n2: string):string;
function add(n1: CombineType, n2: CombineType) {
    if (typeof n1 === 'string' || typeof n2 === 'string') {
        return n1.toString() + n2.toString();
    }

    return n1 + n2;
}

const result = add('Deep', 'Test');
result.split(' ');

//Optional Chaining
const fetchedUserData = {
    name: 'Deep',
    age: 34,
    job: {role: 'Developer', description: 'Developing software'}
}

console.log(fetchedUserData?.job?.role);

//Nullish Coalescing
const userInput = undefined;
const storedData = userInput ?? 'DEFAULT'; // ?? chehck for undefined or null and return default value.
console.log(storedData);